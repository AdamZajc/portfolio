import { Navbar } from '@/components'

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
