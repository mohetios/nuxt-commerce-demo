export default defineAppConfig({
  ui: {
    colors: {
      primary: 'brand',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'rounded-full font-semibold'
      },
      defaultVariants: {
        color: 'primary'
      }
    },
    badge: {
      slots: {
        base: 'rounded-full font-medium'
      }
    },
    card: {
      slots: {
        root: 'rounded-2xl ring ring-soft-border divide-soft-border bg-surface shadow-surface',
        header: 'p-4 sm:px-5 sm:py-4',
        body: 'p-4 sm:p-5',
        footer: 'p-4 sm:px-5 sm:py-4'
      }
    },
    input: {
      slots: {
        base: 'rounded-md'
      }
    },
    select: {
      slots: {
        base: 'rounded-md'
      }
    },
    selectMenu: {
      slots: {
        base: 'rounded-md'
      }
    },
    checkbox: {
      slots: {
        base: 'rounded-sm'
      }
    },
    skeleton: {
      base: 'rounded-2xl bg-field'
    },
    container: {
      base: 'w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8'
    },
    header: {
      slots: {
        root: 'bg-surface border-b border-soft-border',
        container: 'h-16 lg:h-[4.5rem]',
        center: 'hidden min-[900px]:flex gap-4',
        toggle: 'min-[900px]:hidden'
      }
    },
    breadcrumb: {
      slots: {
        link: 'text-muted-blue text-xs md:text-sm',
        linkActive: 'text-ink font-medium',
        separatorIcon: 'size-3.5 text-muted-blue'
      }
    }
  }
})
