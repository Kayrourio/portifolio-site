<template>
  <footer class="site-footer">
    <div class="container-site footer-inner">
      <span class="footer-brand">
        <span class="footer-diamond" aria-hidden="true">◆</span>
        {{ $t('footer.brand') }} • @{{ year }}
      </span>
      <span class="footer-credit">
        {{ $t('footer.built') }} <strong>{{ $t('footer.name') }}</strong>
      </span>
      <nav class="footer-links" aria-label="footer links">
        <a href="https://github.com/kaikeboechat" target="_blank" rel="noopener noreferrer">Github</a>
        <a href="https://linkedin.com/in/kaikeboechat" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:kaikeboechat@gmail.com">Email</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  background: var(--color-bg-deep);
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-5);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.footer-diamond {
  color: var(--color-primary);
  font-size: var(--text-xs);
}

.footer-credit {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.footer-credit strong {
  color: var(--color-text-secondary);
  font-weight: var(--font-medium);
}

.footer-links {
  display: flex;
  gap: var(--space-4);
}

.footer-links a {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-base);
}

.footer-links a:hover {
  color: var(--color-text-secondary);
}

@media (max-width: 767px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .footer-credit {
    display: none;
  }
}
</style>
