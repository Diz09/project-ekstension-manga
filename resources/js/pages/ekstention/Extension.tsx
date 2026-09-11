import { useState } from 'react';
import './styles/extension.css';

type Comic = {
    id: number;
    name: string;
    url: string;
};

export default function Extension() {
    const [active, setActive] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const [comics, setComics] = useState<Comic[]>([
        {
            id: 1,
            name: 'One Piece',
            url: 'https://onepiece.com',
        },
        {
            id: 2,
            name: 'Naruto',
            url: 'https://naruto.com',
        },
        {
            id: 3,
            name: 'Solo Leveling',
            url: 'https://sololeveling.com',
        },
    ]);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    function handleAddComic(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim() || !url.trim()) {
            return;
        }

        const newComic: Comic = {
            id: Date.now(),
            name: name.trim(),
            url: url.trim(),
        };

        setComics((current) => [...current, newComic]);

        setName('');
        setUrl('');
        setShowAddForm(false);
    }

    return (
        <div className="extension">
            <header className="header">
                <div>
                    <h1>Manga Portal Test</h1>
                    <p>Personal comic gateway</p>
                </div>

                <button className="settings" type="button" aria-label="Pengaturan">
                    ⚙
                </button>
            </header>

            <div className="status">
                <div>
                    <span className="status-title">Extension</span>
                    <span className={`status-text ${active ? 'active' : ''}`}>
                        ● {active ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>

                <button
                    type="button"
                    className={`toggle ${active ? 'active' : ''}`}
                    onClick={() => setActive(!active)}
                    aria-label="Aktifkan/Nonaktifkan Extension"
                >
                    <span />
                </button>
            </div>

            {active ? (
                <>
                    <div className="section-title">
                        <h2>Komik Tersimpan</h2>
                        <span>{comics.length}</span>
                    </div>

                    <div className="comic-list">
                        {comics.map((comic) => (
                            <button
                                type="button"
                                className="comic"
                                key={comic.id}
                            >
                                <span>{comic.name}</span>
                                <span className="arrow">›</span>
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="add-button"
                        onClick={() => setShowAddForm(true)}
                    >
                        + Tambah URL Induk
                    </button>
                </>
            ) : (
                <div className="inactive">
                    <h2>Extension Nonaktif</h2>
                    <p>
                        Aktifkan extension untuk menggunakan Manga Portal.
                    </p>

                    <button
                        type="button"
                        onClick={() => setActive(true)}
                    >
                        Aktifkan
                    </button>
                </div>
            )}

            {showAddForm && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <div className="modal-header">
                            <div>
                                <h2>Tambah URL Induk</h2>
                                <p>
                                    Tambahkan website tempat komik dibaca.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setShowAddForm(false)}
                                aria-label="Tutup"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleAddComic}>
                            <label>
                                Nama Komik
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    placeholder="Contoh: One Piece"
                                    autoFocus
                                />
                            </label>

                            <label>
                                URL Induk
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(event) =>
                                        setUrl(event.target.value)
                                    }
                                    placeholder="https://contoh.com"
                                />
                            </label>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() =>
                                        setShowAddForm(false)
                                    }
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <footer>
                Manga Portal · v1.0.0
            </footer>
        </div>
    );
}