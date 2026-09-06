import { useState } from 'react';
import './styles/extension.css';

export default function Extension() {
    const [active, setActive] = useState(true);

    const comics = [
        { id: 1, name: 'One Piece' },
        { id: 2, name: 'Naruto' },
        { id: 3, name: 'Solo Leveling' },
    ];

    return (
        <div className="extension">
            <header className="header">
                <div>
                    <h1>Manga Portal</h1>
                    <p>Personal comic gateway</p>
                </div>

                <button className="settings" type="button">
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

                    <button type="button" className="add-button">
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

            <footer>
                Manga Portal · v1.0.0
            </footer>
        </div>
    );
}