"use client";

import { useEffect, useRef, useState } from "react";

const codeSamples = {
    queue: `public Long enter(Long ticketId, Long userId) {

    Long added = redisTemplate.opsForSet()
            .add(QUEUE_USERS_KEY, userId.toString());

    // 이미 대기열에 있는 사용자
    if (added == null || added == 0L) {
        return getPosition(userId);
    }

    // 처음 들어온 사용자만 실제 대기열에 추가
    return redisTemplate.opsForList()
            .rightPush(QUEUE_KEY, userId.toString());
}

public Long getWaitingCount() {

    Long size = redisTemplate.opsForList()
            .size(QUEUE_KEY);

    return size != null ? size : 0L;
}

public Long getPosition(Long userId) {

    List<String> users =
            redisTemplate.opsForList()
                    .range(QUEUE_KEY, 0, -1);

    int index =
            users.indexOf(userId.toString());

    return index == -1
            ? -1L
            : index + 1L;
}`,

    producer: `@Component
@RequiredArgsConstructor
public class TicketIssueProducer {

    private final KafkaTemplate<String, TicketIssueMessage>
            kafkaTemplate;

    public void send(Long ticketId, Long userId) {

        kafkaTemplate.send(
                TicketKafkaConfig.TICKET_ISSUE_TOPIC,
                userId.toString(),
                new TicketIssueMessage(
                        ticketId,
                        userId
                )
        );
    }
}`,

    consumer: `@KafkaListener(
        topics = TicketKafkaConfig.TICKET_ISSUE_TOPIC,
        groupId = "ticket-issuer"
)
public void consume(TicketIssueMessage message) {

    long start = System.currentTimeMillis();

    boolean issued =
            ticketService.issue(message.ticketId());

    if (issued) {

        redisTemplate.opsForValue()
                .increment(SUCCESS_COUNT_KEY);

        long processingTime =
                System.currentTimeMillis() - start;

        redisTemplate.opsForValue().set(
                PROCESSING_TIME_KEY,
                String.valueOf(processingTime)
        );

        redisTemplate.opsForList()
                .leftPush(
                    PROCESSING_RECENT_KEY,
                    String.valueOf(processingTime)
                );

    } else {

        redisTemplate.opsForValue()
                .increment(FAILURE_COUNT_KEY);
    }
}`,

    ticket: `public boolean issue() {

    if (remainingQuantity <= 0) {
        return false;
    }

    remainingQuantity--;

    return true;
}`,
};

const architectureNodes = [
    ["Browser", "HTML / JS"],
    ["Spring Boot", "REST API"],
    ["Redis", "Waiting Queue"],
    ["Kafka", "ticket-issue"],
    ["Consumer", "Issue"],
    ["MariaDB", "Persistence"],
];

const stack = [
    ["Java 17", "Backend Application"],
    ["Spring Boot", "REST API / Application Layer"],
    ["Spring Data JPA", "Domain / Persistence"],
    ["MariaDB", "Ticket Inventory / Persistent Data"],
    ["Redis", "Queue / Duplicate Prevention / Statistics"],
    ["Apache Kafka", "Async Ticket Issue Processing"],
    ["Docker", "Redis / Kafka Environment"],
    ["Linux", "Server / Deployment Environment"],
    ["Maven", "Build / Dependency Management"],
];

const problems = [
    {
        title: "문제 01. 대량의 동시 요청",
        description:
            "한정된 티켓에 모든 사용자가 직접 DB 요청을 보내는 구조 대신 Redis를 대기열로 사용하여 요청을 순차적으로 관리했습니다.",
    },
    {
        title: "문제 02. 중복 대기열 입장",
        description:
            "Redis Set을 사용하여 사용자가 이미 대기열에 존재하는지 확인하고 중복 등록을 방지했습니다.",
    },
    {
        title: "문제 03. 발급 처리와 요청 분리",
        description:
            "Kafka Producer와 Consumer를 분리하여 대기열에서 꺼낸 발급 요청을 비동기 이벤트로 처리하도록 구성했습니다.",
    },
    {
        title: "문제 04. 처리시간 측정",
        description:
            "Kafka Producer의 전송시간이 아니라 Consumer에서 실제 DB 발급 처리가 끝나는 시점을 기준으로 처리시간을 측정했습니다.",
    },
];

const troubleshooting = [
    {
        category: "Redis",
        title: "redisTemplate.opsForSet().add() 반환 타입 확인",
        description:
            "Redis Set 등록 결과가 Boolean이라고 가정하지 않고 실제 반환 타입인 Long을 기준으로 신규 등록 여부를 처리했습니다.",
    },
    {
        category: "Kafka",
        title: "Kafka 전송시간과 실제 처리시간을 구분",
        description:
            "Producer의 send 호출 시간을 처리시간으로 측정하는 대신 Consumer에서 실제 티켓 발급 작업을 수행하는 구간을 측정하도록 변경했습니다.",
    },
    {
        category: "Waiting Queue",
        title: "대기 순번과 예상 대기시간 구현",
        description:
            "Redis List에서 사용자의 위치를 조회하고, 최근 처리시간을 기반으로 예상 대기시간을 계산했습니다.",
    },
    {
        category: "Frontend",
        title: "실시간 상태 모니터링 화면 구현",
        description:
            "대기 순번, 현재 대기 인원, 예상 대기시간, 성공/실패 통계를 주기적으로 조회하도록 구성했습니다.",
    },
];

const learnings = [
    {
        title: "Kafka가 모든 문제를 해결하지 않는다",
        description:
            "Kafka를 도입한다고 재고 동시성 문제가 자동으로 해결되는 것은 아니라는 것을 확인했습니다. 메시지 처리와 DB의 데이터 정합성은 별도의 문제입니다.",
    },
    {
        title: "Redis의 자료구조 선택이 중요하다",
        description:
            "단순히 Redis를 사용하는 것보다 List, Set 등 자료구조의 특성과 원자성을 이해하고 요구사항에 맞게 사용하는 것이 중요하다는 것을 경험했습니다.",
    },
    {
        title: "대기열과 재고 관리는 다른 문제다",
        description:
            "사용자 요청을 대기시키는 것과 실제 티켓 재고를 정확하게 차감하는 것은 서로 다른 책임이라는 것을 확인했습니다.",
    },
    {
        title: "성능은 숫자로 검증해야 한다",
        description:
            '"Kafka를 사용해서 빨라졌다"와 같은 추상적인 설명보다 요청 수, 처리시간, TPS, 성공/실패 수치를 통해 실제 시스템의 상태를 검증해야 한다는 것을 배웠습니다.',
    },
];

const future = [
    {
        title: "01. DB 동시성 제어",
        description:
            "현재의 단순 재고 감소 로직을 원자적 UPDATE 또는 적절한 Lock 전략으로 개선하여 실제 동시성 상황에서도 재고 정합성을 보장합니다.",
    },
    {
        title: "02. Kafka 실패 처리",
        description:
            "Consumer 처리 실패와 메시지 재처리, 재시도 및 장애 상황을 고려합니다.",
    },
    {
        title: "03. Redis 원자성 개선",
        description:
            "대기열 Set 등록과 List 등록 사이의 불일치 가능성을 분석하고 필요한 경우 Lua Script 등을 적용합니다.",
    },
    {
        title: "04. 부하 테스트 고도화",
        description:
            "10,000명의 테스트를 기준으로 평균 처리시간, P95/P99, TPS, 전체 처리시간 등을 측정합니다.",
    },
    {
        title: "05. Docker / Linux 배포",
        description:
            "로컬 Docker 환경에서 동작하는 시스템을 Linux 서버 환경으로 확장합니다.",
    },
    {
        title: "06. 모니터링",
        description:
            "Redis, Kafka, DB 및 애플리케이션의 상태와 처리량을 시각적으로 확인할 수 있도록 개선합니다.",
    },
];

export default function TicketingPage() {
    const [codeTab, setCodeTab] =
        useState<keyof typeof codeSamples>("queue");

    const [testUsers, setTestUsers] = useState(10000);

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-200">
            <Navigation />

            <Hero />

            <ProjectGoal />

            <Architecture />

            <TechStack />

            <Problems />

            <CodeExplorer
                activeTab={codeTab}
                setActiveTab={setCodeTab}
            />

            <RedisDesign />

            <KafkaSection />

            <LoadTest
                users={testUsers}
                setUsers={setTestUsers}
            />

            <Troubleshooting />

            <Learning />

            <Future />

            <Summary />

            <footer className="border-t border-zinc-900 py-16 text-center text-zinc-500">
                Ticketing System · Backend Portfolio
            </footer>
        </main>
    );
}

/* -------------------------------- */
/* Navigation */
/* -------------------------------- */

function Navigation() {
    return (
        <nav className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-zinc-800 bg-[#09090b]/85 px-[6%] backdrop-blur-xl">
            <div className="font-extrabold tracking-tight">
                Ticketing
                <span className="text-zinc-500">System</span>
            </div>

            <div className="hidden gap-6 text-sm text-zinc-500 md:flex">
                <a href="#overview" className="hover:text-white">
                    Overview
                </a>
                <a href="#architecture" className="hover:text-white">
                    Architecture
                </a>
                <a href="#stack" className="hover:text-white">
                    Stack
                </a>
                <a href="#implementation" className="hover:text-white">
                    Code
                </a>
                <a href="#test" className="hover:text-white">
                    Test
                </a>
                <a href="#troubleshooting" className="hover:text-white">
                    Troubleshooting
                </a>
            </div>
        </nav>
    );
}

/* -------------------------------- */
/* Hero */
/* -------------------------------- */

function Hero() {
    const [count, setCount] = useState(0);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        animateNumber(100, setCount);
        animateNumber(10000, setUsers);
    }, []);

    return (
        <section
            id="overview"
            className="relative flex min-h-screen items-center overflow-hidden border-b border-zinc-900 pt-16"
        >
            <div className="absolute right-[-150px] top-[100px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]" />

            <div className="mx-auto w-[90%] max-w-[1180px]">
                <span className="mb-6 inline-flex rounded-full border border-zinc-700 px-3 py-1.5 text-sm text-zinc-300">
                    Backend / Distributed Processing / Queue System
                </span>

                <h1 className="max-w-[900px] text-[clamp(42px,7vw,82px)] font-black leading-[1.02] tracking-[-0.055em]">
                    대규모 동시 요청을 처리하는{" "}
                    <span className="text-zinc-500">
                        Ticketing System
                    </span>
                </h1>

                <p className="mt-8 max-w-[700px] text-lg leading-8 text-zinc-400">
                    100장의 한정된 티켓에 10,000명의 사용자가 동시에
                    접근하는 상황을 가정하여 Redis 기반 대기열과
                    Kafka 기반 비동기 티켓 발급 시스템을 구현하고
                    성능을 검증했습니다.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                        href="#architecture"
                        className="rounded-lg border border-white bg-white px-5 py-3 text-center font-medium text-zinc-950 transition hover:bg-zinc-200"
                    >
                        Architecture 보기
                    </a>

                    <a
                        href="#implementation"
                        className="rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
                    >
                        핵심 코드 보기
                    </a>
                </div>

                <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-2xl border border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
                    <Stat number={count.toLocaleString()} label="Total Tickets" />
                    <Stat number={users.toLocaleString()} label="Concurrent Requests" />
                    <Stat number="Redis" label="Queue" />
                    <Stat number="Kafka" label="Async Processing" />
                </div>
            </div>
        </section>
    );
}

function Stat({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div className="border-b border-zinc-800 bg-[#111113] p-6 sm:border-r lg:border-b-0">
            <div className="text-3xl font-extrabold">
                {number}
            </div>

            <div className="mt-1 text-xs text-zinc-500">
                {label}
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Project Goal */
/* -------------------------------- */

function ProjectGoal() {
    return (
        <Section>
            <SectionHeader
                label="01 / Project"
                title="왜 만들었는가"
                description="단순한 CRUD 프로젝트가 아니라 실제 티켓팅 시스템에서 발생할 수 있는 동시 요청, 대기열, 비동기 처리, 재고 정합성 문제를 직접 구현하고 검증하는 것을 목표로 했습니다."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
                <InfoCard
                    title="대규모 요청"
                    text="제한된 티켓에 수천~수만 명의 사용자가 동시에 접근하는 상황을 구현합니다."
                />

                <InfoCard
                    title="대기열"
                    text="Redis를 이용하여 사용자 순서를 관리하고 실시간 대기 현황을 제공합니다."
                />

                <InfoCard
                    title="비동기 처리"
                    text="Kafka를 통해 티켓 발급 요청과 실제 발급 처리를 분리합니다."
                />
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Architecture */
/* -------------------------------- */

function Architecture() {
    return (
        <Section id="architecture">
            <SectionHeader
                label="02 / Architecture"
                title="System Architecture"
                description="사용자 요청은 Spring Boot를 거쳐 Redis 대기열에 등록되고, 대기열에서 꺼낸 발급 요청은 Kafka를 통해 Consumer로 전달됩니다. Consumer가 실제 티켓 발급을 수행합니다."
            />

            <ArchitectureFlow />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
                <InfoCard
                    title="Redis"
                    text="List를 이용하여 대기 순서를 관리하고, Set을 이용하여 중복 입장을 방지합니다."
                />

                <InfoCard
                    title="Kafka"
                    text="대기열 처리와 실제 티켓 발급을 분리하여 비동기 이벤트 처리 구조를 구성합니다."
                />

                <InfoCard
                    title="MariaDB"
                    text="티켓 재고와 영속적인 도메인 데이터를 관리합니다."
                />
            </div>
        </Section>
    );
}

function ArchitectureFlow() {
    return (
        <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0d0d0f] p-10">
            <div className="flex min-w-[900px] items-center justify-center gap-3">
                {architectureNodes.map(([title, subtitle], index) => (
                    <div key={title} className="flex items-center gap-3">
                        <Node title={title} subtitle={subtitle} />

                        {index < architectureNodes.length - 1 && (
                            <span className="text-2xl text-zinc-600">
                                →
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Node({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <div className="min-w-[130px] rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-4 text-center">
            <strong className="block text-sm">
                {title}
            </strong>

            <small className="text-xs text-zinc-500">
                {subtitle}
            </small>
        </div>
    );
}

/* -------------------------------- */
/* Stack */
/* -------------------------------- */

function TechStack() {
    return (
        <Section id="stack">
            <SectionHeader
                label="03 / Tech Stack"
                title="Technology Stack"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {stack.map(([name, role]) => (
                    <div
                        key={name}
                        className="rounded-2xl border border-zinc-800 bg-[#111113] p-7 transition hover:-translate-y-0.5 hover:border-zinc-600"
                    >
                        <div className="text-lg font-bold">
                            {name}
                        </div>

                        <div className="mt-2 text-sm text-zinc-400">
                            {role}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Problems */
/* -------------------------------- */

function Problems() {
    return (
        <Section>
            <SectionHeader
                label="04 / Problems"
                title="문제를 어떻게 해결했는가"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
                {problems.map((problem) => (
                    <div
                        key={problem.title}
                        className="rounded-2xl border border-zinc-800 border-l-[3px] border-l-zinc-500 bg-[#111113] p-7"
                    >
                        <div className="font-bold text-zinc-100">
                            {problem.title}
                        </div>

                        <p className="mt-4 text-sm leading-7 text-zinc-400">
                            {problem.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Code Explorer */
/* -------------------------------- */

function CodeExplorer({
    activeTab,
    setActiveTab,
}: {
    activeTab: keyof typeof codeSamples;
    setActiveTab: (tab: keyof typeof codeSamples) => void;
}) {
    const labels: Record<keyof typeof codeSamples, string> = {
        queue: "WaitingQueueService",
        producer: "Kafka Producer",
        consumer: "Kafka Consumer",
        ticket: "Ticket.issue()",
    };

    const copy = async () => {
        await navigator.clipboard.writeText(codeSamples[activeTab]);
    };

    return (
        <Section id="implementation">
            <SectionHeader
                label="05 / Implementation"
                title="핵심 구현 코드"
                description="프로젝트에서 핵심이 되는 Redis Queue와 Kafka Producer, Consumer의 실제 구현 구조입니다."
            />

            <div className="mt-10">
                <div className="mb-3 flex flex-wrap gap-2">
                    {(Object.keys(codeSamples) as Array<
                        keyof typeof codeSamples
                    >).map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`rounded-lg border px-3 py-2 text-sm ${activeTab === tab
                                    ? "border-zinc-600 bg-zinc-800 text-white"
                                    : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                                }`}
                        >
                            {labels[tab]}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <button
                        type="button"
                        onClick={copy}
                        className="absolute right-3 top-3 z-10 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800"
                    >
                        Copy
                    </button>

                    <pre className="max-h-[560px] overflow-auto rounded-xl border border-zinc-800 bg-[#0d0d0f] p-6 text-[13px] leading-7 text-zinc-300">
                        <code>{codeSamples[activeTab]}</code>
                    </pre>
                </div>
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Redis */
/* -------------------------------- */

function RedisDesign() {
    return (
        <Section>
            <SectionHeader
                label="06 / Redis Design"
                title="Redis 자료구조를 어떻게 사용했는가"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
                <InfoCard
                    title="List"
                    text="FIFO 방식의 대기열을 표현하기 위해 Redis List를 사용했습니다."
                >
                    <CodeBlock>
                        {`LPUSH / RPUSH
LPOP
LRANGE
LLEN`}
                    </CodeBlock>
                </InfoCard>

                <InfoCard
                    title="Set"
                    text="동일 사용자가 여러 번 대기열에 들어가는 것을 방지하기 위해 Redis Set을 사용했습니다."
                >
                    <CodeBlock>
                        {`SADD
SREM
SISMEMBER`}
                    </CodeBlock>
                </InfoCard>
            </div>

            <div className="mt-5 rounded-2xl border border-zinc-800 bg-[#111113] p-7">
                <h3 className="text-xl font-bold">
                    왜 List와 Set을 같이 사용했는가?
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                    List는 순서가 필요하고 Set은 빠른 중복 확인이
                    필요합니다. 하나의 자료구조로 두 요구사항을
                    동시에 해결하기보다 각각의 특성에 맞는 Redis
                    자료구조를 사용했습니다.
                </p>
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Kafka */
/* -------------------------------- */

function KafkaSection() {
    return (
        <Section>
            <SectionHeader
                label="07 / Kafka"
                title="Kafka를 왜 사용했는가"
            />

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-7">
                <p className="max-w-3xl text-lg leading-8 text-zinc-400">
                    Kafka를 사용한다고 해서 동시성 문제가 자동으로
                    해결되는 것은 아닙니다. 이 프로젝트에서는
                    대기열 처리와 실제 티켓 발급 처리를 분리하고,
                    발급 요청을 이벤트로 전달하기 위한 목적으로
                    Kafka를 사용했습니다.
                </p>

                <div className="mt-8 overflow-x-auto rounded-2xl border border-zinc-800 bg-[#0d0d0f] p-8">
                    <div className="flex min-w-[700px] items-center justify-center gap-3">
                        <Node title="Queue" subtitle="Waiting User" />
                        <span className="text-2xl text-zinc-600">→</span>
                        <Node title="Producer" subtitle="Send Event" />
                        <span className="text-2xl text-zinc-600">→</span>
                        <Node title="Kafka" subtitle="ticket-issue" />
                        <span className="text-2xl text-zinc-600">→</span>
                        <Node title="Consumer" subtitle="Issue Ticket" />
                    </div>
                </div>
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Load Test */
/* -------------------------------- */

function LoadTest({
    users,
    setUsers,
}: {
    users: number;
    setUsers: (users: number) => void;
}) {
    const tickets = 100;
    const success = Math.min(users, tickets);
    const failure = Math.max(0, users - tickets);

    return (
        <Section id="test">
            <SectionHeader
                label="08 / Load Test"
                title="대규모 요청 테스트"
                description="100장의 티켓에 서로 다른 수의 사용자를 요청시켜 성공/실패/대기열 처리 결과를 비교합니다."
            />

            <div className="my-8 flex flex-wrap gap-2">
                {[100, 1000, 10000].map((value) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => setUsers(value)}
                        className={`rounded-lg border px-4 py-2.5 text-sm ${users === value
                                ? "border-zinc-500 bg-zinc-800"
                                : "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
                            }`}
                    >
                        {value.toLocaleString()} Users
                    </button>
                ))}
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-7">
                <ResultRow
                    label="Requests"
                    value={users.toLocaleString()}
                />

                <ResultRow
                    label="Tickets"
                    value="100"
                />

                <ResultRow
                    label="Success"
                    value={success.toLocaleString()}
                />

                <ResultRow
                    label="Failure"
                    value={failure.toLocaleString()}
                />

                <ResultRow
                    label="Oversell"
                    value="0"
                />
            </div>

            <p className="mt-5 text-sm text-zinc-500">
                ※ 현재 화면의 테스트 수치는 포트폴리오 예시이며,
                실제 테스트 완료 후 측정값으로 교체합니다.
            </p>
        </Section>
    );
}

function ResultRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="grid grid-cols-[120px_1fr] border-b border-zinc-800 py-4 last:border-b-0">
            <div className="text-sm text-zinc-500">
                {label}
            </div>

            <div>{value}</div>
        </div>
    );
}

/* -------------------------------- */
/* Troubleshooting */
/* -------------------------------- */

function Troubleshooting() {
    return (
        <Section id="troubleshooting">
            <SectionHeader
                label="09 / Troubleshooting"
                title="개발 과정에서 해결한 문제"
            />

            <div className="relative mt-10 border-l border-zinc-700 pl-7">
                {troubleshooting.map((item) => (
                    <div
                        key={item.title}
                        className="relative mb-10 last:mb-0"
                    >
                        <span className="absolute -left-[34px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-400" />

                        <span className="text-xs text-zinc-500">
                            {item.category}
                        </span>

                        <h3 className="mt-1 text-xl font-bold">
                            {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-zinc-400">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Learning */
/* -------------------------------- */

function Learning() {
    return (
        <Section>
            <SectionHeader
                label="10 / What I Learned"
                title="배운 점"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
                {learnings.map((item) => (
                    <InfoCard
                        key={item.title}
                        title={item.title}
                        text={item.description}
                    />
                ))}
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Future */
/* -------------------------------- */

function Future() {
    return (
        <Section>
            <SectionHeader
                label="11 / Next"
                title="개선 계획"
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
                {future.map((item) => (
                    <InfoCard
                        key={item.title}
                        title={item.title}
                        text={item.description}
                    />
                ))}
            </div>
        </Section>
    );
}

/* -------------------------------- */
/* Summary */
/* -------------------------------- */

function Summary() {
    return (
        <Section>
            <SectionHeader
                label="12 / Summary"
                title={
                    <>
                        단순한 티켓 CRUD가 아니라
                        <br />
                        트래픽을 처리하는 시스템을 구현했습니다.
                    </>
                }
                description="Spring Boot를 기반으로 REST API와 도메인을 구성하고, Redis를 이용해 대기열을 관리하며, Kafka를 통해 티켓 발급 요청을 비동기 처리했습니다. 이후 대규모 요청 테스트를 통해 시스템의 처리 결과와 성능을 측정하고, 발생한 문제를 분석하여 동시성 제어와 장애 처리까지 확장하는 것을 목표로 합니다."
            />
        </Section>
    );
}

/* -------------------------------- */
/* Common Components */
/* -------------------------------- */

function Section({
    id,
    children,
}: {
    id?: string;
    children: React.ReactNode;
}) {
    const ref = useReveal();

    return (
        <section
            id={id}
            ref={ref}
            className="border-b border-zinc-900 py-20 md:py-28"
        >
            <div className="mx-auto w-[90%] max-w-[1180px]">
                {children}
            </div>
        </section>
    );
}

function SectionHeader({
    label,
    title,
    description,
}: {
    label: string;
    title: React.ReactNode;
    description?: string;
}) {
    return (
        <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500">
                {label}
            </div>

            <h2 className="mb-5 text-[clamp(32px,5vw,52px)] font-black leading-tight tracking-[-0.04em]">
                {title}
            </h2>

            {description && (
                <p className="max-w-[720px] text-[17px] leading-8 text-zinc-400">
                    {description}
                </p>
            )}
        </div>
    );
}

function InfoCard({
    title,
    text,
    children,
}: {
    title: string;
    text: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-7 transition hover:-translate-y-0.5 hover:border-zinc-600">
            <h3 className="mb-2 text-xl font-bold">
                {title}
            </h3>

            <p className="leading-7 text-zinc-400">
                {text}
            </p>

            {children}
        </div>
    );
}

function CodeBlock({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <pre className="mt-5 overflow-auto rounded-xl border border-zinc-800 bg-[#0d0d0f] p-5 text-sm leading-7 text-zinc-300">
            <code>{children}</code>
        </pre>
    );
}

function useReveal() {
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                    observer.disconnect();
                }
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return ref;
}

function animateNumber(
    target: number,
    setter: (value: number) => void
) {
    let current = 0;

    const step = Math.max(
        1,
        Math.floor(target / 80)
    );

    const timer = window.setInterval(() => {
        current += step;

        if (current >= target) {
            current = target;
            window.clearInterval(timer);
        }

        setter(current);
    }, 20);
}