import Counter from '../../components/Counter';
import { Button } from "@/components/ui/button"

// Page function to render the Counter
export default function Page() {
    return (
        <div className="flex flex-col items-center space-y-4">
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">About Page</h1>
                <Button>I am a Shadcn Button</Button>
            </main>
            <Counter initial={0} />
        </div>
    );
}
