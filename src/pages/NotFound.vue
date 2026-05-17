<template>
  <div class="not-found">
    <span class="not-found__code" aria-hidden="true">404</span>
    <h1 class="not-found__title">{{ $t('notfound.title') }}</h1>
    <p class="not-found__desc">{{ $t('notfound.description') }}</p>
    <RouterLink to="/" class="not-found__link">{{ $t('notfound.cta') }}</RouterLink>
  </div>
</template>

<script setup></script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8);
  gap: var(--space-4);
}

.not-found__code {
  font-family: var(--font-mono);
  font-size: clamp(var(--text-8xl), 20vw, 12rem);
  font-weight: var(--font-extrabold);
  color: var(--color-primary-muted);
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(180deg, var(--color-primary-light) 0%, var(--color-primary-muted) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.not-found__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text);
  margin: 0;
}

.not-found__desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 360px;
}

.not-found__link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-4);
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--color-primary);
  text-decoration: none;
  transition: background var(--transition-base), color var(--transition-base);
}

.not-found__link:hover {
  background: var(--color-primary-muted);
}
</style>
