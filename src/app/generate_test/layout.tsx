import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'AI Books',
    description: 'Генерация тестов',
}

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return children
}