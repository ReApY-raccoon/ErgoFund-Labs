# Literature Survey

## Overview

This survey summarizes relevant ideas from blockchain fundraising, decentralized finance (DeFi), and smart contract security/design that inform BenefactionPlatform-Ergo.

## 1) Ethereum Crowdfunding Smart Contracts (General Pattern)

Many early blockchain crowdfunding systems on Ethereum introduced:

- trust-minimized fund collection
- milestone/release conditions in contract logic
- immutable contribution history

### Relevance to this project

- validates the usefulness of contract-mediated contribution rules
- highlights the need for careful contract lifecycle design
- motivates transparent campaign state tracking

### Limitations observed

- gas-cost sensitivity
- contract upgrade complexity
- often weak UX in wallet and campaign discovery flows

## 2) DeFi Protocol Design and Tokenized Incentives

DeFi literature and production protocols demonstrate:

- composability of token incentives
- liquidity and reward design effects on user behavior
- strong need for robust validation and abuse resistance

### Relevance to this project

- informs referral and incentive-friendly fundraising models
- supports multi-token contribution thinking (ERG + selected tokens)
- encourages strict backend validation and defensive APIs

## 3) UTXO-based Smart Contract Models (Ergo/Cardano Family)

Extended UTXO (eUTXO) research and ecosystem practice emphasize:

- deterministic state transitions
- explicit box/asset handling
- improved reasoning about contract state movement

### Relevance to this project

- directly aligned with ErgoScript contract workflows
- shapes contribution and campaign state modeling
- supports auditable, explicit fund flow representation

## 4) Smart Contract Security Best Practices

Security guidance from audits and standards emphasizes:

- least-privilege assumptions
- strict input validation
- clear failure-state handling
- monitoring and incident-ready observability

### Relevance to this project

- reflected in backend validation/error patterns
- supports safer route design and typed API contracts
- encourages incremental rollout with smoke tests

## 5) Blockchain for Philanthropy and Social Impact Funding

Research in this area highlights:

- transparency as a trust multiplier for donors
- importance of campaign credibility and reporting
- need for usable interfaces, not only strong on-chain logic

### Relevance to this project

- motivates analytics dashboard development
- supports a user-centric SvelteKit frontend approach
- links technical architecture to measurable social utility

## Survey Conclusion

The surveyed works collectively justify the architecture choices in BenefactionPlatform-Ergo:

- smart contracts for trust and transparency
- typed backend services for correctness and maintainability
- modern frontend UX for practical adoption
- analytics and referral support for platform growth and accountability
