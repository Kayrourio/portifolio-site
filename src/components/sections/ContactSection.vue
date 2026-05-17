<template>
  <section class="contact-section" aria-labelledby="contact-heading">
    <div class="container-site">
      <h2 id="contact-heading" v-reveal class="contact-headline">
        {{ $t('contact.headline.p1') }}<span class="hl">{{ $t('contact.headline.h1') }}</span>{{ $t('contact.headline.p2') }}<br>
        <span class="hl">{{ $t('contact.headline.h2') }}</span>{{ $t('contact.headline.p3') }}<span class="hl">{{ $t('contact.headline.h3') }}</span>{{ $t('contact.headline.p4') }}
      </h2>

      <hr class="contact-divider" aria-hidden="true" />

      <div v-reveal class="contact-grid">
        <div class="contact-item">
          <span class="contact-label">{{ $t('contact.email_label') }}</span>
          <a :href="`mailto:${$t('contact.email')}`" class="contact-value">{{ $t('contact.email') }}</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">{{ $t('contact.github_label') }}</span>
          <a href="https://github.com/kaikeboechat" class="contact-value" target="_blank" rel="noopener noreferrer">{{ $t('contact.github') }}</a>
        </div>
        <div class="contact-item">
          <span class="contact-label">{{ $t('contact.linkedin_label') }}</span>
          <a href="https://linkedin.com/in/kaikeboechat" class="contact-value" target="_blank" rel="noopener noreferrer">{{ $t('contact.linkedin') }}</a>
        </div>
      </div>
    </div>
  </section>

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
/* ── Contact section ── */
.contact-section {
  padding-block: var(--space-24) var(--space-16);
}

.contact-headline {
  font-family: var(--font-display);
  font-size: clamp(var(--text-5xl), 8vw, 8rem);
  font-weight: var(--font-extrabold);
  color: var(--color-text);
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-8);
}

.hl {
  color: var(--color-primary);
}

.contact-divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 0 var(--space-8);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.contact-label {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.contact-value {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: var(--font-medium);
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-base);
}

.contact-value:hover {
  color: var(--color-primary);
}

/* ── Footer ── */
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

/* ── Mobile ── */
@media (max-width: 767px) {
  .contact-section {
    padding-block: var(--space-16) var(--space-12);
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

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
