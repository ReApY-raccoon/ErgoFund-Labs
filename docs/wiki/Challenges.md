# Challenges

## Technical Challenges Faced

## 1) Multi-Environment Deployment Complexity

- frontend SSR requires host-specific adapter behavior
- API and frontend often live on different hosts/domains
- misaligned build context can cause missing function output or 404 routing issues

## 2) Wallet and Blockchain UX Constraints

- wallet availability differs by user environment
- address handling and transaction UX must stay simple for non-technical users
- on-chain operations require careful feedback and fallback messaging

## 3) Token and Data Modeling

- campaign and contribution logic spans ERG and token assets
- analytics payloads need consistent shaping for frontend consumption
- balancing mock/development data with production-ready data contracts requires discipline

## 4) API Safety and Validation

- referral and campaign endpoints need strict input validation
- robust error messaging is needed without leaking sensitive internals
- rate limiting and security middleware must be tuned for usability and protection

## 5) Monorepo Coordination

- cross-package dependencies (`packages/sdk`, frontend, backend) require build order awareness
- contributors need clear scripts and docs to avoid local setup friction
- deployment config must stay synchronized with code changes

## Current System Limitations

- analytics currently include mock-oriented structures in some flows
- referral abuse prevention can be expanded with stronger heuristics
- contract-level automation and governance features are still evolving
- observability can be improved with richer metrics and tracing

## Lessons Learned

- explicit environment and hosting documentation is critical
- strong typed contracts between frontend and backend reduce regressions
- incremental implementation with smoke tests is effective for blockchain-adjacent systems
