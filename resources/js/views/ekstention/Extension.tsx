import { useState } from 'react';
import './styles/extension.css';

export default function Extension() {
    const [active, setActive] = useState(true);

    const comics = [
        {
            id: 1,
            name: 'One Piece',
        },
        {
            id: 2,
            name: 'Naruto',
        },
        {
            id: 3,
            name: 'Solo Leveling',
        },
    ];

    return (
        <div className="extension">
            <header className="extension-header">
                <div>
                    <h1>Manga Portal</h1>
                    <p>Personal Manga Extension</p>
                </div>

                <button
                    type="button"
                    className="settings-button"
                    aria-label="Pengaturan"
                >
                    ⚙
                </button>
            </header>

            <section className="status-card">
                <div className="status-information">
                    <span className="status-label">
                        Status Extension
                    </span>

                    <span
                        className={
                            active
                                ? 'status-value active'
                                : 'status-value inactive'
                        }
                    >
                        <span className="status-indicator">
                            ●
                        </span>

                        {active ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>

                <button
                    type="button"
                    className={`toggle ${active ? 'active' : ''}`}
                    onClick={() => setActive(!active)}
                    aria-label="Aktifkan atau nonaktifkan extension"
                >
                    <span className="toggle-circle" />
                </button>
            </section>

            {active ? (
                <>
                    <section className="comic-section">
                        <div className="section-header">
                            <h2>Komik Tersimpan</h2>

                            <span className="comic-count">
                                {comics.length}
                            </span>
                        </div>

                        <div className="comic-list">
                            {comics.map((comic) => (
                                <button
                                    type="button"
                                    key={comic.id}
                                    className="comic-item"
                                >
                                    <span className="comic-name">
                                        {comic.name}
                                    </span>

                                    <span className="comic-arrow">
                                        ›
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    <button
                        type="button"
                        className="add-url-button"
                    >
                        <span className="add-icon">＋</span>

                        <span>Tambah URL Induk</span>
                    </button>
                </>
            ) : (
                <section className="inactive-message">
                    <div className="inactive-icon">
                        ◌
                    </div>

                    <h2>Extension Nonaktif</h2>

                    <p>
                        Aktifkan extension untuk menggunakan
                        fitur Manga Portal.
                    </p>
                </section>
            )}
        </div>
    );
}