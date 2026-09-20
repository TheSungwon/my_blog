"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Project = {
    icon: string;
    category: string;
    title: string;
    period: string;
    role: string;
    summary: string;
    tags: string[];
    stats: { label: string; value: string }[];
    flow: { from: string; to: string; label: string }[];
    details: string[];
};

const projects: Project[] = [
    {
        icon: "🏦",
        category: "BANK / WEB PORTAL / RPA",
        title: "을지로 C 은행 RPA & 웹포탈 구축",
        period: "2025 상반기",
        role: "Backend / Web Portal / RPA",
        summary:
            "RPA 처리 결과와 OCR 데이터를 통합 관리하고 EAI를 통해 은행 시스템과 연계하는 웹포탈 구축",
        tags: ["Spring Boot", "JPA", "SQL", "RPA", "OCR", "EAI", "Docker"],
        stats: [
            { label: "Role", value: "Backend" },
            { label: "Integration", value: "EAI" },
            { label: "Automation", value: "RPA" },
            { label: "Data", value: "OCR" },
        ],
        flow: [
            { from: "OCR", to: "Web Portal", label: "추출 데이터" },
            { from: "Web Portal", to: "EAI", label: "API 연계" },
            { from: "EAI", to: "Bank System", label: "데이터 전달" },
            { from: "RPA", to: "Customer Program", label: "자동 입력" },
        ],
        details: [
            "Spring Boot 기반 고객사 웹포탈 Backend 시스템 설계 및 개발",
            "OCR 추출 결과와 RPA 처리 내역을 웹포탈에서 통합 조회",
            "EAI를 활용하여 은행 배치 시스템 및 고객사 프로그램과 API 연계",
            "OCR 추출 데이터를 EAI를 통해 고객사 시스템으로 전달",
            "여신 사후 정보 입력 및 OCR 데이터를 고객사 프로그램에 자동 입력",
            "시스템 간 데이터 송수신 및 데이터 정합성 처리",
            "Docker 기반 배포 환경 구성",
        ],
    },
    {
        icon: "🛡️",
        category: "INSURANCE / RPA",
        title: "광화문 B 보험사 RPA 프로젝트",
        period: "2023 ~ 2026",
        role: "RPA 개발 / 1인 개발 주도",
        summary:
            "보험 업무 프로세스 분석부터 자동화 설계·개발까지 전 과정을 주도한 RPA 프로젝트",
        tags: ["RPA", "VBA", "C#", "Selenium", "OneDrive", "Teams"],
        stats: [
            { label: "기간", value: "4년" },
            { label: "Automation", value: "30건" },
            { label: "개발", value: "1인 주도" },
            { label: "Domain", value: "보험" },
        ],
        flow: [
            { from: "Excel", to: "RPA", label: "데이터 추출" },
            { from: "OneDrive", to: "RPA", label: "파일 수집" },
            { from: "RPA", to: "Customer Program", label: "대량 등록" },
            { from: "RPA", to: "Teams", label: "파일 관리" },
        ],
        details: [
            "보험 업무 프로세스 분석부터 자동화 시스템 설계 및 구축까지 1인 개발 주도",
            "부서별 엑셀 데이터를 추출하여 고객사 프로그램에 보험 정보 대량 등록",
            "보험 관련 파일 및 정보를 자동 수집하고 고객사 프로그램에 업로드",
            "OneDrive, Teams 등 외부 업무 시스템과 연계한 파일 관리 자동화",
            "월별 부서 보험 통계 데이터를 자동 수집 및 등록",
            "Selenium 기반 웹 자동화 프로세스 개발 및 운영",
        ],
    },
    {
        icon: "📈",
        category: "SECURITIES / RPA",
        title: "여의도 A 증권사 RPA 프로젝트",
        period: "2021 ~ 2022",
        role: "RPA 개발",
        summary:
            "증권 업무 프로세스를 분석하고 반복 업무를 자동화하여 총 11건의 RPA 프로세스를 구축",
        tags: ["RPA", "VBA", "C#", "OCR"],
        stats: [
            { label: "기간", value: "2년" },
            { label: "Automation", value: "11건" },
            { label: "Domain", value: "증권" },
            { label: "OCR", value: "적용" },
        ],
        flow: [
            { from: "Internal System", to: "RPA", label: "자료 조회" },
            { from: "RPA", to: "File", label: "파일 처리" },
            { from: "OCR", to: "RPA", label: "데이터 추출" },
            { from: "RPA", to: "Customer System", label: "자동 등록" },
        ],
        details: [
            "증권 업무 프로세스 분석 및 RPA 자동화 시스템 구축",
            "총 11건의 업무 자동화 프로세스 설계 및 개발",
            "일일 결재서류를 자동 조회 및 다운로드하고 부서별 시스템에 일괄 업로드",
            "법인카드 사용 내역 검증 및 부서별 근태 처리 자동화",
            "영업일 기준 예탁원 자료를 자동 수집하고 고객사 시스템으로 전달 및 대사",
            "문서 파일 OCR 처리 후 보수총액 데이터를 추출하여 고객사 시스템에 자동 등록",
        ],
    },
];

const sideProjects = [
    {
        number: "01",
        title: "Ticketing System",
        category: "BACKEND / DISTRIBUTED PROCESSING / QUEUE SYSTEM",
        description:
            "대규모 동시 요청 상황에서 Redis 대기열과 Kafka 비동기 처리를 활용하여 티켓 발급 시스템을 구현하고 검증한 프로젝트",
        tags: [
            "Spring Boot",
            "Redis",
            "Kafka",
            "MariaDB",
            "Docker",
        ],
        features: [
            "Redis 기반 FIFO 대기열",
            "Redis Set 중복 입장 방지",
            "Kafka 비동기 티켓 발급",
            "Producer / Consumer 분리",
            "실시간 대기 순번",
            "예상 대기시간 계산",
            "동시 요청 및 부하 테스트",
            "초과 발급 방지",
        ],
        points:
            "대기열과 실제 티켓 발급 처리를 분리하고 Redis List / Set과 Kafka Producer / Consumer를 활용하여 동시 요청 상황을 처리하도록 구성했습니다.",
        github: "https://github.com/TheSungwon/demo_ticketing",
        recent: true,
    },
    {
        number: "02",
        title: "Shortify",
        category: "BACKEND SYSTEM",
        description:
            "대규모 요청을 안정적으로 처리하는 실시간 URL 단축 및 로그 분석 백엔드 시스템",
        tags: [
            "Spring Boot",
            "Redis",
            "Kafka",
            "RabbitMQ",
            "JWT",
            "Docker",
        ],
        features: [
            "Base62 기반 URL 단축",
            "Redis 캐싱 및 Key Lock",
            "Kafka 비동기 로그 스트리밍",
            "RabbitMQ 비동기 알림",
            "JWT Stateless 인증",
            "Prometheus / Grafana 모니터링",
        ],
        points:
            "단축 URL 조회와 로그 처리의 책임을 분리하여 요청 처리와 로그 저장을 비동기로 구성했습니다.",
        github: "https://github.com/thesungwon/shortify",
    },
    {
        number: "03",
        title: "next_ocr",
        category: "AI / OCR",
        description:
            "Next.js와 Vision 모델을 활용하여 이미지에서 텍스트를 추출하고 결과를 관리하는 OCR 서비스",
        tags: [
            "Next.js 16",
            "React 19",
            "Tailwind CSS",
            "OpenRouter",
            "Neon",
        ],
        features: [
            "이미지 파일 업로드",
            "Ctrl + V 이미지 붙여넣기",
            "Vision 모델 OCR",
            "OCR 결과 저장",
            "History 조회 및 삭제",
            "통계 Dashboard",
            "Dark / Light Theme",
        ],
        points:
            "OCR 요청부터 결과 저장, 히스토리 관리, 통계 화면까지 하나의 웹 서비스 형태로 구현했습니다.",
        github: "https://github.com/TheSungwon/next_ocr",
        site: "https://next-ocr-six.vercel.app/",
    },
    {
        number: "04",
        title: "Real CMP K8s Connector",
        category: "CLOUD / KUBERNETES",
        description:
            "CMP Backend에서 Kubernetes API를 호출하여 클러스터 자원을 조회하는 연동 모듈",
        tags: [
            "Java",
            "Spring Boot",
            "WebFlux",
            "WebClient",
            "Kubernetes",
        ],
        features: [
            "Kubernetes API 연동",
            "WebClient 논블로킹 통신",
            "Pod 목록 조회",
            "K8s DTO 데이터 매핑",
            "ServiceAccount 인증",
            "RBAC 권한 처리",
            "MiniKube 테스트 환경",
        ],
        points:
            "Kubernetes API의 인증과 인가 문제를 직접 해결하고 WebFlux 기반 논블로킹 API 연동을 구현했습니다.",
    },
];

const techIcons: Record<string, string> = {
    Java: "☕",
    "Spring Boot": "🍃",
    JPA: "🗃️",
    MyBatis: "🔗",
    MariaDB: "🐬",
    SQL: "🛢️",
    JavaScript: "🟨",
    TypeScript: "🔷",
    "React.js": "⚛️",
    "Next.js": "▲",
    "Node.js": "🟢",
    jQuery: "⚡",
    AJAX: "↔️",
    RPA: "🤖",
    VBA: "📊",
    "C#": "🔷",
    Selenium: "🌐",
    Playwright: "🎭",
    LLM: "🧠",
    RAG: "📚",
    "AI OCR": "👁️",
    vLLM: "⚡",
    Kafka: "📨",
    Redis: "🔴",
    RabbitMQ: "🐇",
    Linux: "🐧",
    Docker: "🐳",
    Podman: "📦",
    GitHub: "◉",
    GitLab: "🦊",
    Jira: "📋",
    Slack: "💬",
    Teams: "👥",
};

export default function Home() {
    return (
        <main className="min-h-screen bg-[#fafafa] text-zinc-900 transition-colors duration-500 dark:bg-[#09090b] dark:text-zinc-100">
            {/* NAV */}
            <nav className="fixed left-1/2 top-5 z-50 flex w-[calc(100%-32px)] max-w-5xl -translate-x-1/2 items-center justify-between rounded-full border border-zinc-200/70 bg-white/80 px-5 py-3 shadow-lg backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/80">
                <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
                        <Image
                            src="/img/asdasdasd.jpg"
                            alt="박성원 프로필"
                            fill
                            sizes="36px"
                            className="object-cover"
                        />
                    </div>

                    <span className="font-bold tracking-tight">
                        Backend & Beyond
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#about"
                        className="hidden text-sm text-zinc-500 transition hover:text-zinc-900 sm:block dark:text-zinc-300 dark:hover:text-white"
                    >
                        About
                    </a>

                    <a
                        href="#projects"
                        className="hidden text-sm text-zinc-500 transition hover:text-zinc-900 sm:block dark:text-zinc-300 dark:hover:text-white"
                    >
                        Projects
                    </a>

                    <a
                        href="#side-projects"
                        className="hidden text-sm text-zinc-500 transition hover:text-zinc-900 sm:block dark:text-zinc-300 dark:hover:text-white"
                    >
                        Side Projects
                    </a>

                    <ThemeButton />
                </div>
            </nav>

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-blue-950/20 dark:via-zinc-950 dark:to-purple-950/20" />

                <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
                    <div className="mb-8 flex justify-end">
                        <ThemeButton />
                    </div>

                    <div className="grid items-center gap-12 md:grid-cols-[180px_1fr]">
                        <div className="relative mx-auto md:mx-0">
                            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-25 blur-2xl transition-opacity duration-300 dark:opacity-40" />

                            <div className="relative rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-blue-500 p-1.5 shadow-xl dark:from-blue-400 dark:via-purple-500 dark:to-indigo-400 dark:shadow-blue-500/20">
                                <div className="rounded-full bg-white p-1.5 dark:bg-zinc-950">
                                    <Image
                                        src="/img/asdasdasd.jpg"
                                        alt="박성원 프로필"
                                        width={180}
                                        height={180}
                                        priority
                                        className="h-40 w-40 rounded-full object-cover md:h-44 md:w-44"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
                                Backend & Beyond
                            </p>

                            <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-blue-400 md:text-6xl">
                                박성원
                                <span className="text-blue-600 dark:text-blue-400">
                                    {" "}
                                    | Backend & Beyond By Sungwon
                                </span>
                            </h1>

                            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-300 md:text-xl">
                                비효율을 자동화하고, 고객이 진짜 가치 있는 일에
                                집중할 수 있게 도와주는 엔지니어,
                                <br />
                                <span className="font-black text-zinc-900 dark:text-blue-400">
                                    박성원입니다.
                                </span>
                            </p>

                            <p className="mt-4 max-w-3xl leading-7 text-zinc-600 dark:text-zinc-300">
                                RPA와 웹 개발을 기반으로 업무 자동화부터
                                Backend 시스템과 웹 포털 구축까지 전체
                                사이클을 경험했습니다.
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <a
                                    href="https://github.com/TheSungwon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-1.027-.014-1.862-2.782.604-3.369-1.342-3.369-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.071 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.914.832.091-.647.349-1.087.636-1.338-2.221-.253-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.841-2.338 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.337-.012 2.415-.012 2.744 0 .268.18.58.688.482A10.001 10.001 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
                                    </svg>
                                    GitHub
                                </a>

                                <a
                                    href="mailto:thesungwon@gmail.com"
                                    className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        aria-hidden="true"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
                                        <path d="m22 6-10 7L2 6" />
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section
                id="about"
                className="border-y border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-6xl px-6 py-28">
                    <SectionTitle
                        eyebrow="ABOUT ME"
                        title="꾸준히 배우고, 직접 적용합니다."
                    />

                    <div className="mt-14 grid gap-12 md:grid-cols-[1fr_2fr]">
                        <div>
                            <h3 className="text-2xl font-bold">
                                As a Developer
                            </h3>

                            <p className="mt-4 leading-7 text-zinc-500 dark:text-zinc-400">
                                Backend & AI / Automation Developer
                            </p>
                        </div>

                        <div className="space-y-7 break-keep text-base leading-8 text-zinc-600 dark:text-zinc-300 md:text-lg">
                            <p>
                                <strong className="text-zinc-900 dark:text-white">
                                    Java · Spring Boot
                                </strong>{" "}
                                를 중심으로 백엔드 시스템을 개발해왔으며,{" "}
                                <strong className="text-blue-600 dark:text-blue-400">
                                    5년 3개월의 실무 경험
                                </strong>
                                을 보유하고 있습니다.
                            </p>

                            <p>
                                고객사 웹포탈과 시스템 연계를 직접 개발하며{" "}
                                <strong className="text-zinc-900 dark:text-white">
                                    API · DB · EAI
                                </strong>{" "}
                                기반의 데이터 처리와 서비스 개발을 경험했습니다.
                            </p>

                            <p>
                                최근에는{" "}
                                <strong className="text-blue-600 dark:text-blue-400">
                                    LLM · AI OCR · vLLM
                                </strong>{" "}
                                을 직접 적용하고, AI 모델을 기존 업무 시스템과 연계하는 개발을
                                진행하고 있습니다.
                            </p>

                            <p>
                                또한 RPA · OCR 기반 자동화 프로젝트를 수행하며{" "}
                                <strong className="text-zinc-900 dark:text-white">
                                    업무 분석부터 시스템 개발 및 운영
                                </strong>{" "}
                                까지 경험했습니다.
                            </p>

                            <div className="grid gap-3 pt-3 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    {
                                        label: "BACKEND",
                                        value: (
                                            <>
                                                Java
                                                <br />
                                                Spring Boot
                                            </>
                                        ),
                                    },
                                    {
                                        label: "WEB",
                                        value: (
                                            <>
                                                React
                                                <br />
                                                Next.js
                                            </>
                                        ),
                                    },
                                    {
                                        label: "AI",
                                        value: (
                                            <>
                                                LLM
                                                <br />
                                                vLLM
                                                <br />
                                                AI OCR
                                            </>
                                        ),
                                    },
                                    {
                                        label: "AUTOMATION",
                                        value: (
                                            <>
                                                RPA
                                                <br />
                                                OCR
                                            </>
                                        ),
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.label}
                                        className="group rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
                                    >
                                        <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 transition-colors group-hover:text-blue-500 dark:text-zinc-500 dark:group-hover:text-blue-400">
                                            {item.label}
                                        </p>

                                        <p className="mt-2 font-bold leading-6 text-zinc-800 transition-colors group-hover:text-blue-600 dark:text-zinc-200 dark:group-hover:text-blue-400">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SKILLS */}
            <section className="mx-auto max-w-6xl px-6 py-28">
                <SectionTitle
                    eyebrow="TECH STACK"
                    title="사용하는 기술"
                />

                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <SkillCard
                        icon={<ServerIcon />}
                        title="Backend"
                        items={[
                            "Java",
                            "Spring Boot",
                            "JPA",
                            "MyBatis",
                            "MariaDB",
                            "SQL",
                        ]}
                    />

                    <SkillCard
                        icon={<CodeIcon />}
                        title="Frontend"
                        items={[
                            "JavaScript",
                            "TypeScript",
                            "React.js",
                            "Next.js",
                            "Node.js",
                            "jQuery",
                            "AJAX",
                        ]}
                    />


                    <SkillCard
                        icon={<CloudIcon />}
                        title="DevOps / Tools"
                        items={[
                            "Linux",
                            "Docker",
                            "Podman",
                            "GitHub",
                            "GitLab",
                            "Jira",
                            "Slack",
                            "Teams",
                        ]}
                    />


                    <SkillCard
                        icon={<AiIcon />}
                        title="AI / OCR"
                        items={[
                            "LLM",
                            "RAG",
                            "AI OCR",
                            "vLLM",
                        ]}
                    />

                    <SkillCard
                        icon={<MessageIcon />}
                        title="Messaging / Cache"
                        items={[
                            "Kafka",
                            "Redis",
                            "RabbitMQ",
                        ]}
                    />


                    <SkillCard
                        icon={<RobotIcon />}
                        title="Automation"
                        items={[
                            "RPA",
                            "VBA",
                            "C#",
                            "Selenium",
                            "Playwright",
                        ]}
                    />

                </div>
            </section>

            {/* EXPERIENCE */}
            <section
                id="projects"
                className="border-y border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950"
            >
                <div className="mx-auto max-w-6xl px-6 py-28">
                    <SectionTitle
                        eyebrow="EXPERIENCE"
                        title="실무 프로젝트"
                    />

                    <div className="mt-14 space-y-6">
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.title}
                                project={project}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SIDE PROJECTS */}
            <section
                id="side-projects"
                className="mx-auto max-w-6xl px-6 py-28"
            >
                <SectionTitle
                    eyebrow="SIDE PROJECTS"
                    title="업무 외에도 직접 만듭니다."
                />

                <div className="mt-14 grid gap-6">
                    {sideProjects.map((project) => (
                        <SideProjectCard
                            key={project.title}
                            project={project}
                        />
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-zinc-200 py-20 text-center dark:border-zinc-900">
                <p className="text-2xl font-bold">
                    Backend & Beyond By Sungwon
                </p>

                <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    안정적인 시스템을 만들고, 새로운 기술을 배웁니다.
                </p>

                <p className="mt-8 text-xs text-zinc-400">
                    © 2026 Park Sungwon
                </p>
            </footer>
        </main>
    );
}

/* -------------------------------- */
/* Theme Button */
/* -------------------------------- */

function ThemeButton() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button
                type="button"
                aria-label="테마 변경"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
                🌙
            </button>
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="테마 변경"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm transition-all hover:scale-110 dark:border-zinc-700 dark:bg-zinc-900"
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}

/* -------------------------------- */
/* Section */
/* -------------------------------- */

function SectionTitle({
    eyebrow,
    title,
}: {
    eyebrow: string;
    title: string;
}) {
    return (
        <div>
            <p className="text-xs font-bold tracking-[0.25em] text-zinc-400 dark:text-zinc-500">
                {eyebrow}
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                {title}
            </h2>
        </div>
    );
}

/* -------------------------------- */
/* Project Card */
/* -------------------------------- */

function ProjectFlow({ flow }: { flow: Project["flow"] }) {
    return (
        <div className="mt-7 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-2">
                {flow.map((item, index) => (
                    <div key={`${item.from}-${item.to}-${index}`} className="flex items-center gap-2">
                        <div className="min-w-[125px] rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800">
                            <span className="block text-[10px] font-bold tracking-wider text-blue-500 dark:text-blue-400">
                                {item.label}
                            </span>
                            <span className="mt-1 block text-sm font-bold text-zinc-800 dark:text-zinc-100">
                                {item.from}
                            </span>
                        </div>

                        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="shrink-0 text-blue-500">
                            <path d="M3 12H39" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" className="animate-pulse" />
                            <path d="M34 7L40 12L34 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {index === flow.length - 1 && (
                            <div className="min-w-[125px] rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-900 dark:bg-blue-950/30">
                                <span className="block text-[10px] font-bold tracking-wider text-blue-500 dark:text-blue-400">
                                    RESULT
                                </span>
                                <span className="mt-1 block text-sm font-bold text-blue-900 dark:text-blue-200">
                                    {item.to}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectCard({ project }: { project: Project }) {
    const [open, setOpen] = useState(false);

    return (
        <article className={`group relative overflow-hidden rounded-[2rem] border bg-white transition-all duration-500 dark:bg-zinc-950 ${open
            ? "border-blue-300 shadow-2xl shadow-blue-500/10 dark:border-blue-800"
            : "border-zinc-200 shadow-sm hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800"
            }`}>
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl transition-transform duration-700 group-hover:scale-150" />

            <div className="relative p-7 sm:p-9">
                <div className="flex flex-col justify-between gap-6 md:flex-row">
                    <div className="flex gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 dark:bg-blue-950/40">
                            {project.icon}
                        </div>

                        <div>
                            <p className="text-xs font-bold tracking-[0.2em] text-blue-500 dark:text-blue-400">
                                {project.category}
                            </p>

                            <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                                {project.title}
                            </h3>

                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                {project.period} · {project.role}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-end">
                        {project.stats.map((stat) => (
                            <div key={stat.label} className="min-w-[82px] rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 text-center dark:border-zinc-800 dark:bg-zinc-900">
                                <strong className="block text-lg font-black">{stat.value}</strong>
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="mt-6 max-w-4xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    {project.summary}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-blue-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-blue-950/30 dark:hover:text-blue-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <ProjectFlow flow={project.flow} />

                <button type="button" onClick={() => setOpen(!open)} className="mt-5 flex w-full items-center justify-between rounded-2xl border border-zinc-200 px-5 py-4 text-left text-sm font-semibold transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:hover:border-blue-800 dark:hover:bg-blue-950/20">
                    <span>{open ? "프로젝트 상세 닫기" : "실제 수행 업무 보기"}</span>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 transition-transform duration-300 dark:bg-zinc-800 ${open ? "rotate-180" : ""}`}>↓</span>
                </button>

                <div className={`grid transition-all duration-500 ${open ? "mt-7 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className="border-t border-zinc-200 pt-7 dark:border-zinc-800">
                            <div className="relative ml-3 border-l border-zinc-200 pl-7 dark:border-zinc-800">
                                {project.details.map((detail, index) => (
                                    <div key={detail} className="relative mb-7 last:mb-0">
                                        <span className="absolute -left-[35px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-blue-500 dark:border-zinc-950" />
                                        <span className="text-xs font-semibold text-blue-500 dark:text-blue-400">0{index + 1}</span>
                                        <p className="mt-1 text-sm leading-7 text-zinc-600 dark:text-zinc-300">{detail}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

/* -------------------------------- */
/* Side Project Card */
/* -------------------------------- */

function SideProjectCard({
    project,
}: {
    project: (typeof sideProjects)[number];
}) {
    const [open, setOpen] = useState(false);

    const isTicketing = project.number === "01";

    return (
        <article
            className={`group relative overflow-hidden rounded-[2rem] border bg-white transition-all duration-500 dark:bg-zinc-950 ${project.recent
                ? "border-blue-300 shadow-lg shadow-blue-500/10 hover:-translate-y-2 hover:shadow-2xl dark:border-blue-700 dark:shadow-blue-500/10"
                : "border-zinc-200 hover:-translate-y-1 hover:shadow-2xl dark:border-zinc-800"
                }`}
        >
            {/* NEW PROJECT EFFECT */}
            {project.recent && (
                <>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                </>
            )}

            <div className="relative p-7 sm:p-9">
                {/* HEADER */}
                <div className="flex items-start justify-between gap-5">
                    <div>
                        {project.recent && (
                            <span className="mb-3 inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-blue-600 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                                NEW PROJECT
                            </span>
                        )}

                        <span className="block text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                            {project.number} / {project.category}
                        </span>

                        <h3 className="mt-3 text-3xl font-black">
                            {project.title}
                        </h3>
                    </div>

                    <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl sm:flex dark:bg-zinc-900">
                        {project.number === "01"
                            ? "🎟️"
                            : project.number === "02"
                                ? "🔗"
                                : project.number === "03"
                                    ? "🧠"
                                    : "☸️"}
                    </div>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-5 max-w-4xl leading-7 text-zinc-600 dark:text-zinc-300">
                    {project.description}
                </p>

                {/* TAGS */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 dark:hover:text-blue-400"
                        >
                            {tag}
                        </span>
                    ))}

                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            className="ml-auto rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-black"
                        >
                            GitHub ↗
                        </Link>
                    )}
                    {project.number === "01" && (
                        <Link
                            href="/side"
                            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                            Side Projects ↗
                        </Link>
                    )}
                    {project.number === "03" && project.site && (
                        <Link
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-zinc-300 px-4 py-1.5 text-xs font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                            Live Site ↗
                        </Link>
                    )}
                </div>

                {/* DETAIL BUTTON */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className={`mt-7 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold transition ${project.recent
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"
                        }`}
                >
                    <span>
                        {open ? "프로젝트 상세 닫기" : "프로젝트 상세 보기"}
                    </span>

                    <span
                        className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    >
                        ↓
                    </span>
                </button>

                {/* DETAIL */}
                <div
                    className={`grid transition-all duration-700 ${open
                        ? "mt-7 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                        }`}
                >
                    <div className="overflow-hidden">
                        {isTicketing ? (
                            <TicketingDetail project={project} />
                        ) : (
                            <CommonSideProjectDetail project={project} />
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}

/* -------------------------------- */
/* Ticketing Detail */
/* -------------------------------- */

function TicketingDetail({
    project,
}: {
    project: (typeof sideProjects)[number];
}) {
    return (
        <div className="border-t border-zinc-200 pt-8 dark:border-zinc-800">
            {/* PROJECT GOAL */}
            <div>
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    PROJECT GOAL
                </p>

                <h4 className="mt-3 text-xl font-bold">
                    대규모 동시 요청을 안정적으로 처리하는 티켓팅 시스템
                </h4>

                <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                    100개의 티켓을 대상으로 10,000명의 사용자가 동시에
                    접근하는 상황을 가정하고, 대기열과 비동기 메시징을
                    활용하여 티켓 발급 시스템을 설계했습니다.
                </p>
            </div>

            {/* ARCHITECTURE */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    ARCHITECTURE
                </p>

                <div className="mt-5 overflow-x-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex min-w-[850px] items-center justify-center gap-3 text-sm font-semibold">
                        <ArchitectureBox text="Browser" />

                        <Arrow />

                        <ArchitectureBox text="Spring Boot REST API" />

                        <Arrow />

                        <ArchitectureBox
                            text="Redis Waiting Queue"
                            highlight
                        />

                        <Arrow />

                        <ArchitectureBox
                            text="Kafka"
                            highlight
                        />

                        <Arrow />

                        <ArchitectureBox text="Consumer" />

                        <Arrow />

                        <ArchitectureBox text="MariaDB" />
                    </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    사용자의 요청을 바로 DB에 전달하지 않고 Redis 대기열에
                    먼저 적재한 뒤 Kafka 이벤트를 통해 실제 티켓 발급을
                    비동기 처리하도록 구성했습니다.
                </p>
            </div>

            {/* REDIS */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    REDIS DESIGN
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <TechDetailCard
                        title="Redis List"
                        description="FIFO 대기열을 관리하기 위해 List 자료구조를 사용했습니다."
                        items={[
                            "LPUSH / RPUSH",
                            "LPOP",
                            "LRANGE",
                            "LLEN",
                        ]}
                    />

                    <TechDetailCard
                        title="Redis Set"
                        description="동일 사용자의 중복 입장을 방지하고 대기열 상태를 확인하기 위해 Set을 사용했습니다."
                        items={[
                            "SADD",
                            "SREM",
                            "SISMEMBER",
                        ]}
                    />
                </div>

                <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-sm font-bold">
                        Redis 자료구조를 분리한 이유
                    </p>

                    <p className="mt-2 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                        List는 순서를 보장하는 대기열 관리에 사용하고,
                        Set은 중복 여부 확인과 사용자 상태 관리에 사용하여
                        각각의 역할을 분리했습니다.
                    </p>
                </div>
            </div>

            {/* KAFKA */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    KAFKA PROCESSING
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <TechDetailCard
                        title="Producer"
                        description="대기열에서 처리 대상이 된 사용자의 티켓 발급 이벤트를 Kafka Topic으로 전달합니다."
                        items={[
                            "KafkaTemplate",
                            "Event Message",
                            "Async Processing",
                        ]}
                    />

                    <TechDetailCard
                        title="Consumer"
                        description="Kafka 이벤트를 수신하여 실제 티켓 수량을 확인하고 DB에 발급 결과를 저장합니다."
                        items={[
                            "@KafkaListener",
                            "Ticket.issue()",
                            "MariaDB Persistence",
                        ]}
                    />
                </div>

                <div className="mt-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-blue-950/30">
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
                        Kafka를 사용하는 이유
                    </p>

                    <p className="mt-2 text-sm leading-7 text-blue-900/80 dark:text-blue-200/80">
                        Kafka가 동시성 문제를 자동으로 해결하는 것이 아니라,
                        대기열 처리와 실제 티켓 발급 처리를 분리하여
                        비동기 이벤트 기반으로 처리하기 위해 사용했습니다.
                    </p>
                </div>
            </div>

            {/* PROBLEM SOLVING */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    PROBLEM SOLVING
                </p>

                <div className="mt-5 space-y-3">
                    <ProblemRow
                        number="01"
                        title="대규모 동시 요청"
                        description="수천~수만 건의 요청이 DB로 직접 몰리지 않도록 Redis 대기열을 먼저 거치도록 구성"
                    />

                    <ProblemRow
                        number="02"
                        title="중복 대기열 입장"
                        description="Redis Set을 활용하여 이미 대기 중인 사용자의 중복 입장을 방지"
                    />

                    <ProblemRow
                        number="03"
                        title="티켓 발급 처리 분리"
                        description="Kafka Producer / Consumer 구조를 통해 대기열 처리와 실제 발급 로직을 분리"
                    />

                    <ProblemRow
                        number="04"
                        title="처리시간 측정"
                        description="Producer의 Kafka 전송 시간이 아닌 Consumer의 실제 DB 티켓 발급 처리 시간을 기준으로 측정"
                    />
                </div>
            </div>

            {/* LOAD TEST */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    LOAD TEST
                </p>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <MetricCard
                        value="100"
                        label="Tickets"
                    />

                    <MetricCard
                        value="1,000"
                        label="Concurrent Users"
                    />

                    <MetricCard
                        value="10,000"
                        label="Concurrent Users"
                    />
                </div>

                <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                        부하 테스트 화면에서 동시 사용자 수, 티켓 수,
                        성공 / 실패 요청, 초과 발급 여부를 확인할 수 있도록
                        구성했습니다.
                    </p>

                    <p className="mt-2 text-xs text-zinc-400">
                        ※ 위 수치는 테스트 시나리오 예시이며 최종 성능 측정값을
                        의미하지 않습니다.
                    </p>
                </div>
            </div>

            {/* REAL-TIME WAITING */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    REAL-TIME WAITING
                </p>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <MetricCard
                        value="Position"
                        label="현재 대기 순번"
                    />

                    <MetricCard
                        value="Count"
                        label="전체 대기 인원"
                    />

                    <MetricCard
                        value="ETA"
                        label="예상 대기시간"
                    />
                </div>

                <p className="mt-4 text-sm leading-7 text-zinc-500 dark:text-zinc-400">
                    Redis List의 대기 순번과 최근 처리 시간을 기준으로
                    예상 대기시간을 계산하고 Frontend에서 주기적으로
                    대기 상태를 조회하도록 구성했습니다.
                </p>
            </div>

            {/* IMPLEMENTATION NOTE */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    IMPLEMENTATION NOTE
                </p>

                <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="space-y-4 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                        <p>
                            <strong className="text-zinc-900 dark:text-white">
                                Redis Set 반환값
                            </strong>
                            <br />
                            <code className="rounded bg-zinc-200 px-2 py-1 text-xs dark:bg-zinc-800">
                                redisTemplate.opsForSet().add()
                            </code>
                            는 추가된 요소의 개수를 나타내는{" "}
                            <strong>Long</strong>을 반환하도록 처리했습니다.
                        </p>

                        <p>
                            <strong className="text-zinc-900 dark:text-white">
                                Kafka 시간 측정
                            </strong>
                            <br />
                            Producer의 send 시간과 Consumer의 실제 티켓 발급
                            처리 시간을 구분하여 측정했습니다.
                        </p>

                        <p>
                            <strong className="text-zinc-900 dark:text-white">
                                Queue와 Inventory 분리
                            </strong>
                            <br />
                            대기열 관리와 티켓 재고 관리는 서로 다른 문제로
                            보고 각각 독립적으로 처리했습니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* LEARNING */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    WHAT I LEARNED
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                        "Kafka가 모든 동시성 문제를 해결하는 것은 아니라는 점",
                        "Redis 자료구조를 목적에 맞게 선택하는 중요성",
                        "대기열과 티켓 재고 문제를 분리해서 설계해야 한다는 점",
                        "성능을 감이 아닌 수치로 측정해야 한다는 점",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                        >
                            <span className="mr-2 text-blue-500">
                                ✓
                            </span>

                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* FUTURE */}
            <div className="mt-10">
                <p className="text-xs font-bold tracking-[0.2em] text-blue-600 dark:text-blue-400">
                    NEXT STEP
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {[
                        "DB Atomic Update / Lock 기반 동시성 제어",
                        "Kafka 실패 및 Retry 처리",
                        "Redis Lua Script를 활용한 원자적 처리",
                        "P95 / P99 / TPS / 전체 처리시간 측정",
                        "Docker / Linux 기반 배포",
                        "Monitoring 환경 구성",
                    ].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-zinc-200 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300"
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* GITHUB */}
            <div className="mt-10 flex flex-wrap gap-3">
                {project.github && (
                    <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600 dark:bg-white dark:text-black"
                    >
                        GitHub ↗
                    </Link>
                )}
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Common Side Project Detail */
/* -------------------------------- */

function CommonSideProjectDetail({
    project,
}: {
    project: (typeof sideProjects)[number];
}) {
    return (
        <div className="grid gap-6 border-t border-zinc-200 pt-6 md:grid-cols-2 dark:border-zinc-800">
            <div>
                <h4 className="font-bold">
                    핵심 기능
                </h4>

                <ul className="mt-4 space-y-3">
                    {project.features.map((feature) => (
                        <li
                            key={feature}
                            className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300"
                        >
                            <span className="mt-1 text-xs text-zinc-900 dark:text-white">
                                ✓
                            </span>

                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h4 className="font-bold">
                    구현 포인트
                </h4>

                <p className="mt-4 rounded-2xl bg-zinc-50 p-5 text-sm leading-7 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
                    {project.points}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                    {project.github && (
                        <Link
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-black"
                        >
                            GitHub ↗
                        </Link>
                    )}

                    {project.site && (
                        <Link
                            href={project.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                        >
                            Live Site ↗
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Architecture Box */
/* -------------------------------- */

function ArchitectureBox({
    text,
    highlight = false,
}: {
    text: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={`rounded-xl border px-4 py-3 text-center text-xs whitespace-nowrap ${highlight
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
                }`}
        >
            {text}
        </div>
    );
}

/* -------------------------------- */
/* Arrow */
/* -------------------------------- */

function Arrow() {
    return (
        <span className="text-zinc-400">
            →
        </span>
    );
}

/* -------------------------------- */
/* Tech Detail Card */
/* -------------------------------- */

function TechDetailCard({
    title,
    description,
    items,
}: {
    title: string;
    description: string;
    items: string[];
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h4 className="font-bold">
                {title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                    <span
                        key={item}
                        className="rounded-lg bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-600 shadow-sm dark:bg-zinc-800 dark:text-zinc-300"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Problem Row */
/* -------------------------------- */

function ProblemRow({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
            <span className="shrink-0 text-sm font-black text-blue-600 dark:text-blue-400">
                {number}
            </span>

            <div>
                <h4 className="font-bold">
                    {title}
                </h4>

                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

/* -------------------------------- */
/* Metric Card */
/* -------------------------------- */

function MetricCard({
    value,
    label,
}: {
    value: string;
    label: string;
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <strong className="block text-2xl font-black">
                {value}
            </strong>

            <span className="mt-1 block text-xs font-medium text-zinc-400">
                {label}
            </span>
        </div>
    );
}

/* -------------------------------- */
/* Skill Card */
/* -------------------------------- */

function SkillCard({
    icon,
    title,
    items,
}: {
    icon: React.ReactNode;
    title: string;
    items: string[];
}) {
    return (
        <div className="group relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 blur-2xl transition-all duration-500 group-hover:scale-150 dark:bg-blue-950/30" />

            <div className="relative">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-zinc-900 dark:text-white">
                        {icon}
                    </div>

                    <h3 className="text-xl font-bold">
                        {title}
                    </h3>
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                    {items.map((item) => (
                        <div
                            key={item}
                            className="flex min-h-[52px] items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:bg-blue-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm dark:bg-zinc-800">
                                {techIcons[item] ?? "◆"}
                            </span>

                            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* -------------------------------- */
/* SVG Icons */
/* -------------------------------- */

function ServerIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-transform duration-700 group-hover:rotate-180"
        >
            <rect x="3" y="3" width="18" height="7" rx="2" />
            <rect x="3" y="14" width="18" height="7" rx="2" />
            <path d="M7 7h.01M7 18h.01" />
            <path d="M11 7h6M11 18h6" />
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-transform duration-500 group-hover:scale-110"
        >
            <path d="m8 9-4 3 4 3" />
            <path d="m16 9 4 3-4 3" />
            <path d="m14 5-4 14" />
        </svg>
    );
}

function RobotIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-all duration-500 group-hover:rotate-6"
        >
            <rect x="4" y="7" width="16" height="13" rx="3" />
            <path d="M12 3v4M8 12h.01M16 12h.01M8 16h8" />
            <path d="M2 12h2M20 12h2" />
        </svg>
    );
}

function AiIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-transform duration-700 group-hover:rotate-[360deg]"
        >
            <circle cx="12" cy="12" r="3" />
            <circle cx="12" cy="12" r="8" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
            <path d="m5 5 2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" />
        </svg>
    );
}

function MessageIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-transform duration-500 group-hover:-translate-y-1"
        >
            <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z" />
            <path d="M8 12h.01M12 12h.01M16 12h.01" />
        </svg>
    );
}

function CloudIcon() {
    return (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="transition-transform duration-500 group-hover:-translate-y-2"
        >
            <path d="M17.5 19H8a6 6 0 1 1 1.2-11.88A7 7 0 0 1 22 10a4.5 4.5 0 0 1-4.5 9Z" />
            <path d="M12 11v7M9.5 15l2.5-2.5 2.5 2.5" />
        </svg>
    );
}