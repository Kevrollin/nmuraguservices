import { BookOpenCheck, ChartLine, HandCoins, ReceiptText, type LucideProps } from 'lucide-react'
import type { ServiceIcon as ServiceIconName } from '../data/siteConfig'

const icons = {
  books: BookOpenCheck,
  tax: ReceiptText,
  payroll: HandCoins,
  advisory: ChartLine,
} satisfies Record<ServiceIconName, unknown>

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name]
  return <Icon {...props} />
}
