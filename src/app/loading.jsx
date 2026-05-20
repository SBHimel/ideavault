const Loading = () => {
    return (
        // 🌌 ব্যাকগ্রাউন্ডে জিঙ্ক কালারের সাথে ম্যাচিং ডার্ক টোন
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-zinc-950">

            <div className="flex flex-col items-center gap-5">

                {/* 🔄 আপনার সেই চমৎকার কাস্টম স্পিনার */}
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-zinc-100 dark:border-zinc-900" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-violet-600 border-r-fuchsia-500 animate-spin" />
                </div>

                {/* 📝 টেক্সট সেকশন: অ্যানিমেটেড ভাইব সহ */}
                <div className="text-center">
                    <h2 className="text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-100 uppercase animate-pulse">
                        Opening Vault...
                    </h2>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1 max-w-xs">
                        Please wait while we secure your ideas...
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Loading;