// Focus management utilities

export function focusNextElement(container?: HTMLElement) {
  const focusableElements = getFocusableElements(container)
  const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
  const nextIndex = (currentIndex + 1) % focusableElements.length
  focusableElements[nextIndex]?.focus()
}

export function focusPreviousElement(container?: HTMLElement) {
  const focusableElements = getFocusableElements(container)
  const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
  const previousIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1
  focusableElements[previousIndex]?.focus()
}

export function getFocusableElements(container?: HTMLElement): HTMLElement[] {
  const selector = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'details summary',
    '[contenteditable="true"]',
  ].join(', ')

  const elements = (container || document).querySelectorAll(selector) as NodeListOf<HTMLElement>
  return Array.from(elements).filter(isElementVisible)
}

function isElementVisible(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element)
  return style.display !== 'none' && style.visibility !== 'hidden' && !element.hasAttribute('disabled')
}

// Focus trap utilities
export function createFocusTrap(element: HTMLElement) {
  const focusableElements = getFocusableElements(element)
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  // Focus first element
  firstElement?.focus()

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

// Screen reader utilities
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcer = document.createElement('div')
  announcer.setAttribute('aria-live', priority)
  announcer.setAttribute('aria-atomic', 'true')
  announcer.className = 'sr-only'
  announcer.textContent = message

  document.body.appendChild(announcer)

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer)
  }, 1000)
}

export function createLiveRegion(priority: 'polite' | 'assertive' = 'polite'): HTMLDivElement {
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('aria-live', priority)
  liveRegion.setAttribute('aria-atomic', 'true')
  liveRegion.className = 'sr-only'
  document.body.appendChild(liveRegion)
  return liveRegion
}

// Keyboard navigation utilities
export function handleKeyboardNavigation(
  e: KeyboardEvent,
  options: {
    onEnter?: () => void
    onSpace?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
    onHome?: () => void
    onEnd?: () => void
    onPageUp?: () => void
    onPageDown?: () => void
  }
) {
  switch (e.key) {
    case 'Enter':
      e.preventDefault()
      options.onEnter?.()
      break
    case ' ':
    case 'Spacebar':
      e.preventDefault()
      options.onSpace?.()
      break
    case 'Escape':
      e.preventDefault()
      options.onEscape?.()
      break
    case 'ArrowUp':
      e.preventDefault()
      options.onArrowUp?.()
      break
    case 'ArrowDown':
      e.preventDefault()
      options.onArrowDown?.()
      break
    case 'ArrowLeft':
      e.preventDefault()
      options.onArrowLeft?.()
      break
    case 'ArrowRight':
      e.preventDefault()
      options.onArrowRight?.()
      break
    case 'Home':
      e.preventDefault()
      options.onHome?.()
      break
    case 'End':
      e.preventDefault()
      options.onEnd?.()
      break
    case 'PageUp':
      e.preventDefault()
      options.onPageUp?.()
      break
    case 'PageDown':
      e.preventDefault()
      options.onPageDown?.()
      break
  }
}

// ARIA utilities
export function setAriaAttributes(element: HTMLElement, attributes: Record<string, string>) {
  Object.entries(attributes).forEach(([attribute, value]) => {
    element.setAttribute(attribute, value)
  })
}

export function removeAriaAttributes(element: HTMLElement, attributes: string[]) {
  attributes.forEach(attribute => {
    element.removeAttribute(attribute)
  })
}

// Role utilities
export function setRole(element: HTMLElement, role: string) {
  element.setAttribute('role', role)
}

export function removeRole(element: HTMLElement) {
  element.removeAttribute('role')
}

// Label utilities
export function setLabel(element: HTMLElement, label: string) {
  element.setAttribute('aria-label', label)
}

export function setLabelledBy(element: HTMLElement, labelledBy: string) {
  element.setAttribute('aria-labelledby', labelledBy)
}

export function setDescribedBy(element: HTMLElement, describedBy: string) {
  element.setAttribute('aria-describedby', describedBy)
}

// State utilities
export function setExpanded(element: HTMLElement, expanded: boolean) {
  element.setAttribute('aria-expanded', expanded.toString())
}

export function setSelected(element: HTMLElement, selected: boolean) {
  element.setAttribute('aria-selected', selected.toString())
}

export function setChecked(element: HTMLElement, checked: boolean) {
  element.setAttribute('aria-checked', checked.toString())
}

export function setDisabled(element: HTMLElement, disabled: boolean) {
  element.setAttribute('aria-disabled', disabled.toString())
  element.disabled = disabled
}

export function setHidden(element: HTMLElement, hidden: boolean) {
  element.setAttribute('aria-hidden', hidden.toString())
}

// Property utilities
export function setRequired(element: HTMLElement, required: boolean) {
  element.setAttribute('aria-required', required.toString())
  element.required = required
}

export function setInvalid(element: HTMLElement, invalid: boolean, message?: string) {
  element.setAttribute('aria-invalid', invalid.toString())
  if (invalid && message) {
    element.setAttribute('aria-errormessage', message)
  } else {
    element.removeAttribute('aria-errormessage')
  }
}

export function setBusy(element: HTMLElement, busy: boolean) {
  element.setAttribute('aria-busy', busy.toString())
}

// Live region utilities
export function createPoliteLiveRegion(): HTMLDivElement {
  return createLiveRegion('polite')
}

export function createAssertiveLiveRegion(): HTMLDivElement {
  return createLiveRegion('assertive')
}

// Landmark utilities
export function markAsLandmark(element: HTMLElement, landmark: string) {
  setRole(element, landmark)
}

export function markAsMain(element: HTMLElement) {
  markAsLandmark(element, 'main')
}

export function markAsNavigation(element: HTMLElement) {
  markAsLandmark(element, 'navigation')
}

export function markAsBanner(element: HTMLElement) {
  markAsLandmark(element, 'banner')
}

export function markAsContentInfo(element: HTMLElement) {
  markAsLandmark(element, 'contentinfo')
}

export function markAsSearch(element: HTMLElement) {
  markAsLandmark(element, 'search')
}

export function markAsComplementary(element: HTMLElement) {
  markAsLandmark(element, 'complementary')
}

export function markAsForm(element: HTMLElement) {
  markAsLandmark(element, 'form')
}

export function markAsRegion(element: HTMLElement, label: string) {
  markAsLandmark(element, 'region')
  setLabel(element, label)
}

// Heading utilities
export function setHeadingLevel(element: HTMLElement, level: number) {
  if (level < 1 || level > 6) {
    console.warn('Heading level must be between 1 and 6')
    return
  }

  const heading = document.createElement(`h${level}`)
  heading.textContent = element.textContent
  heading.setAttribute('role', 'heading')
  heading.setAttribute('aria-level', level.toString())

  element.parentNode?.replaceChild(heading, element)
}

// List utilities
export function markAsList(element: HTMLElement) {
  setRole(element, 'list')
}

export function markAsListItem(element: HTMLElement) {
  setRole(element, 'listitem')
}

export function markAsListbox(element: HTMLElement) {
  setRole(element, 'listbox')
}

export function markAsOption(element: HTMLElement, selected?: boolean) {
  setRole(element, 'option')
  if (selected !== undefined) {
    setSelected(element, selected)
  }
}

// Table utilities
export function markAsTable(element: HTMLElement) {
  setRole(element, 'table')
}

export function markAsTableRow(element: HTMLElement) {
  setRole(element, 'row')
}

export function markAsTableCell(element: HTMLElement, type: 'cell' | 'rowheader' | 'columnheader' = 'cell') {
  setRole(element, type)
}

// Dialog utilities
export function markAsDialog(element: HTMLElement, label?: string) {
  setRole(element, 'dialog')
  setLabel(element, label || 'Dialog')
}

export function markAsAlertDialog(element: HTMLElement) {
  setRole(element, 'alertdialog')
}

export function markAsModal(element: HTMLElement) {
  setRole(element, 'dialog')
  setLabel(element, 'Modal dialog')
}

// Menu utilities
export function markAsMenu(element: HTMLElement) {
  setRole(element, 'menu')
}

export function markAsMenuItem(element: HTMLElement) {
  setRole(element, 'menuitem')
}

export function markAsMenuCheckbox(element: HTMLElement, checked?: boolean) {
  setRole(element, 'menuitemcheckbox')
  if (checked !== undefined) {
    setChecked(element, checked)
  }
}

export function markAsMenuRadio(element: HTMLElement, checked?: boolean) {
  setRole(element, 'menuitemradio')
  if (checked !== undefined) {
    setChecked(element, checked)
  }
}

// Tab utilities
export function markAsTabList(element: HTMLElement) {
  setRole(element, 'tablist')
}

export function markAsTab(element: HTMLElement, selected?: boolean) {
  setRole(element, 'tab')
  if (selected !== undefined) {
    setSelected(element, selected)
  }
}

export function markAsTabPanel(element: HTMLElement, labelledBy?: string) {
  setRole(element, 'tabpanel')
  if (labelledBy) {
    setLabelledBy(element, labelledBy)
  }
}

// Tooltip utilities
export function markAsTooltip(element: HTMLElement, describedBy?: string) {
  setRole(element, 'tooltip')
  if (describedBy) {
    setDescribedBy(element, describedBy)
  }
}

// Tree utilities
export function markAsTree(element: HTMLElement) {
  setRole(element, 'tree')
}

export function markAsTreeItem(element: HTMLElement, expanded?: boolean, selected?: boolean) {
  setRole(element, 'treeitem')
  if (expanded !== undefined) {
    setExpanded(element, expanded)
  }
  if (selected !== undefined) {
    setSelected(element, selected)
  }
}

// Grid utilities
export function markAsGrid(element: HTMLElement) {
  setRole(element, 'grid')
}

export function markAsGridCell(element: HTMLElement) {
  setRole(element, 'gridcell')
}

export function markAsRowHeader(element: HTMLElement) {
  setRole(element, 'rowheader')
}

export function markAsColumnHeader(element: HTMLElement) {
  setRole(element, 'columnheader')
}

// Utility for checking accessibility
export function checkAccessibility(element: HTMLElement): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = []

  // Check for alt text on images
  const images = element.querySelectorAll('img')
  images.forEach(img => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push({
        type: 'missing-alt-text',
        element: img as HTMLElement,
        message: 'Image is missing alt text or aria-label',
        severity: 'warning',
      })
    }
  })

  // Check for proper heading structure
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substring(1))
    if (level > previousLevel + 1) {
      issues.push({
        type: 'heading-skip',
        element: heading as HTMLElement,
        message: `Heading level skip detected: h${previousLevel} to h${level}`,
        severity: 'warning',
      })
    }
    previousLevel = level
  })

  // Check for form labels
  const inputs = element.querySelectorAll('input, textarea, select')
  inputs.forEach(input => {
    const hasLabel = input.getAttribute('aria-label') ||
                     input.getAttribute('aria-labelledby') ||
                     element.querySelector(`label[for="${input.id}"]`)
    if (!hasLabel) {
      issues.push({
        type: 'missing-form-label',
        element: input as HTMLElement,
        message: 'Form input is missing a label',
        severity: 'error',
      })
    }
  })

  // Check for button content
  const buttons = element.querySelectorAll('button')
  buttons.forEach(button => {
    if (!button.textContent?.trim() && !button.getAttribute('aria-label')) {
      issues.push({
        type: 'missing-button-content',
        element: button as HTMLElement,
        message: 'Button is missing content or aria-label',
        severity: 'error',
      })
    }
  })

  // Check for link context
  const links = element.querySelectorAll('a[href]')
  links.forEach(link => {
    if (link.textContent?.trim() === 'click here' || link.textContent?.trim() === 'read more') {
      issues.push({
        type: 'poor-link-text',
        element: link as HTMLElement,
        message: 'Link text is not descriptive enough',
        severity: 'warning',
      })
    }
  })

  return issues
}

interface AccessibilityIssue {
  type: string
  element: HTMLElement
  message: string
  severity: 'error' | 'warning' | 'info'
}

// Utility to generate accessibility report
export function generateAccessibilityReport(element: HTMLElement): AccessibilityReport {
  const issues = checkAccessibility(element)
  const errors = issues.filter(issue => issue.severity === 'error')
  const warnings = issues.filter(issue => issue.severity === 'warning')
  const info = issues.filter(issue => issue.severity === 'info')

  return {
    total: issues.length,
    errors: errors.length,
    warnings: warnings.length,
    info: info.length,
    issues,
    score: Math.max(0, 100 - (errors.length * 10) - (warnings.length * 5)),
  }
}

interface AccessibilityReport {
  total: number
  errors: number
  warnings: number
  info: number
  issues: AccessibilityIssue[]
  score: number
}

// Color contrast utilities
export function getColorContrast(color1: string, color2: string): number {
  // This is a simplified implementation
  // In a real application, you'd want to use a proper color contrast library
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return 0

  const luminance1 = getRelativeLuminance(rgb1)
  const luminance2 = getRelativeLuminance(rgb2)

  const lighter = Math.max(luminance1, luminance2)
  const darker = Math.min(luminance1, luminance2)

  return (lighter + 0.05) / (darker + 0.05)
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const rsRGB = rgb.r / 255
  const gsRGB = rgb.g / 255
  const bsRGB = rgb.b / 255

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function meetsWCAGAA(contrastRatio: number): boolean {
  return contrastRatio >= 4.5
}

export function meetsWCAGAAA(contrastRatio: number): boolean {
  return contrastRatio >= 7
}

export function meetsWCAGAALarge(contrastRatio: number): boolean {
  return contrastRatio >= 3
}

export function meetsWCAGAAALarge(contrastRatio: number): boolean {
  return contrastRatio >= 4.5
}