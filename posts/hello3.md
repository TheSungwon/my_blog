---
title: "Server Platform Engineer 포트폴리오"
date: "2025-10-17"
description: "고가용성과 퍼포먼스를 고민하며 성장한 엔지니어의 기술 여정"
cover: "/images/cover-engineer.jpg"
tags: ["Spring Boot", "Kafka", "Microservice", "Performance", "DevOps"]
---

# ⚙️ Server Platform Engineer 포트폴리오

안녕하세요!  
**유연하고 높은 퍼포먼스의 소프트웨어를 설계하고 개선하는 엔지니어**입니다.  
TPS **300% 향상**, 레이턴시 **60~80% 단축**, 마이크로서비스 전환 등  
측정 가능한 결과를 통해 시스템의 효율성과 안정성을 추구해왔습니다.

> **“결국, 좋은 서버란 변화와 트래픽을 견디는 구조다.”**

---

## 🧩 About Me

| 항목   | 내용                                                 |
| ------ | ---------------------------------------------------- |
| 포지션 | Server Platform Engineer                             |
| 성향   | 문제 해결 중심, 구조적 사고, 성능 최적화             |
| 목표   | 확장성 높은 시스템과 자동화된 인프라 구축            |
| 가치관 | 투명한 협업, 코드의 가독성과 유지보수성, 지속적 학습 |

**Skills**

> Java, Kotlin, Spring Boot, Spring Cloud  
> MySQL, Redis, Kafka  
> AWS, Kubernetes, Prometheus, Grafana, Terraform, ArgoCD

---

## 🚀 대표 프로젝트: Shortify

**기간:** 2024.03 ~ Present  
**역할:** 백엔드 및 인프라 엔지니어  
**성과:** TPS 3배 향상 / 배포시간 70% 단축 / 레이턴시 60% 개선

### 📘 개요

URL 단축 및 트래킹 플랫폼입니다.  
초기 모놀리식 구조로 시작했으나, **Kafka 기반 마이크로서비스 아키텍처(MSA)** 로 전환하며  
서비스의 **고가용성**과 **확장성**, **데이터 일관성**을 확보했습니다.

---

### 🔧 주요 기여

- **비동기 API 기반 성능 개선**

  - Spring WebFlux 기반 Non-Blocking I/O 도입
  - Gateway 인증 서버와 서비스 간 통신 최적화 → **TPS 300% 향상**

- **쿼리 및 인덱싱 최적화**

  - 커버링 인덱스 및 Projection 적용
  - 페이징 쿼리 속도 `794ms → 211ms` (73% 개선)

- **Redis 분산락 기반 동시성 문제 해결**

  - 예약 시스템의 중복 요청 해결
  - TTL 기반 락 해제 및 트랜잭션 일관성 보장

- **MSA 전환 및 인프라 자동화**
  - Helm Charts + ArgoCD로 서비스 배포 자동화
  - Karpenter 도입으로 다운타임 없는 노드 스케일링 구축

---

### 📊 기술 스택

| 영역      | 기술                                                  |
| --------- | ----------------------------------------------------- |
| Backend   | Kotlin, Spring Boot, WebFlux, Spring Cloud Stream     |
| Infra     | AWS EKS, ArgoCD, Terraform, Prometheus, Grafana, Loki |
| Database  | MySQL, Redis                                          |
| Messaging | Kafka                                                 |

---

## 🛰️ 프로젝트: Notification Service

**기간:** 2025.08 ~ 2025.09  
**목표:** `stock-decreased` Kafka 이벤트를 소비하여 실시간 알림을 발송하는 마이크로서비스 구축

### 🔨 구현 내용

- Kafka Consumer 기반 메시징 처리
- RabbitMQ와 Kafka 병행 테스트
- 다중 토픽 구독 및 비동기 처리 구조 설계
- Spring Boot + Redis로 메시지 큐 모니터링 기능 개발

```java
@KafkaListener(topics = "stock-decreased", groupId = "notification-service")
public void handleStockDecreased(StockEvent event) {
    notificationService.send(event);
}
```

<img src="/img/asdasdasd.jpg" alt="제미니 로고" width="100" />
