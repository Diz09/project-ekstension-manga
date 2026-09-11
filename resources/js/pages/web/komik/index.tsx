import { Head, useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

type UrlInduk = {
    id: number;
    url: string;
};

type Komik = {
    id: number;
    nama: string;
    url_induks: UrlInduk[];
};

type Props = {
    komiks: Komik[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Komik',
        href: '/komik',
    },
];

Index.layout = {
    breadcrumbs,
};

export default function Index({ komiks }: Props) {
    const form = useForm({
        nama: '',
    });

    function submit(event: React.FormEvent) {
        event.preventDefault();

        form.post('/komik', {
            onSuccess: () => form.reset(),
        });
    }

    return (
        <>
            <Head title="Komik" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Komik Saya
                    </h1>

                    <p className="text-muted-foreground">
                        Kelola komik dan URL induk yang kamu simpan.
                    </p>
                </div>

                <div className="rounded-xl border p-6">
                    <h2 className="mb-4 font-semibold">
                        Tambah Komik
                    </h2>

                    <form
                        onSubmit={submit}
                        className="flex gap-3"
                    >
                        <input
                            type="text"
                            value={form.data.nama}
                            onChange={(event) =>
                                form.setData(
                                    'nama',
                                    event.target.value,
                                )
                            }
                            placeholder="Nama komik"
                            className="flex-1 rounded-md border px-3 py-2"
                        />

                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                        >
                            Tambah
                        </button>
                    </form>

                    {form.errors.nama && (
                        <p className="mt-2 text-sm text-red-500">
                            {form.errors.nama}
                        </p>
                    )}
                </div>

                <div className="space-y-4">
                    {komiks.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                            Belum ada komik tersimpan.
                        </div>
                    ) : (
                        komiks.map((komik) => (
                            <div
                                key={komik.id}
                                className="rounded-xl border p-5"
                            >
                                <h2 className="font-semibold">
                                    {komik.nama}
                                </h2>

                                {komik.url_induks.length === 0 ? (
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Belum ada URL induk.
                                    </p>
                                ) : (
                                    <div className="mt-3 space-y-2">
                                        {komik.url_induks.map(
                                            (url) => (
                                                <div
                                                    key={url.id}
                                                    className="rounded-md bg-muted px-3 py-2 text-sm"
                                                >
                                                    {url.url}
                                                </div>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}