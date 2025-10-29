import React from 'react';
import { Github, Mail, Twitter, Globe, PenTool, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-950 border-t border-cyan-900/40 text-gray-400 font-mono py-10 mt-20">
            <div className="max-w-6xl mx-auto px-6 text-center md:text-left grid md:grid-cols-3 gap-8">
                {/* --- 左：サイト情報 --- */}
                <div>
                    <h3 className="text-cyan-400 text-lg font-bold mb-3">Yuu Ohnuki.dev</h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                        若者の「今」をコード化し、
                        <br />
                        未来を駆動するフルスタックデベロッパー。
                    </p>
                </div>

                {/* --- 中央：ナビゲーション --- */}
                <div>
                    <h4 className="text-cyan-300 text-sm font-bold mb-3 tracking-wider uppercase">Sections</h4>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#実績" className="hover:text-cyan-400 transition">
                                実績
                            </a>
                        </li>
                        <li>
                            <a href="#成果物" className="hover:text-cyan-400 transition">
                                成果物
                            </a>
                        </li>
                        <li>
                            <a href="#スキル" className="hover:text-cyan-400 transition">
                                スキル
                            </a>
                        </li>
                        <li>
                            <a href="#強み" className="hover:text-cyan-400 transition">
                                強み
                            </a>
                        </li>
                        <li>
                            <a href="#連絡先" className="hover:text-cyan-400 transition">
                                連絡先
                            </a>
                        </li>
                    </ul>
                </div>

                {/* --- 右：SNS / 連絡先 --- */}
                <div>
                    <h4 className="text-cyan-300 text-sm font-bold mb-3 tracking-wider uppercase">Connect</h4>
                    <ul className="flex justify-center md:justify-start gap-4">
                        <li>
                            <a
                                href="https://github.com/YuuOhnuki"
                                target="_blank"
                                aria-label="GitHub"
                                className="text-gray-400 hover:text-cyan-400 transition"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:its.yuu.ohnuki@gmail.com"
                                target="_blank"
                                aria-label="Email"
                                className="text-gray-400 hover:text-cyan-400 transition"
                            >
                                <Mail className="w-5 h-5" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://zenn.dev/ohnukiyuu"
                                target="_blank"
                                aria-label="Zenn"
                                className="text-gray-400 hover:text-cyan-400 transition"
                            >
                                <PenTool className="w-5 h-5" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://qiita.com/OhnukiYuu"
                                target="_blank"
                                aria-label="Qiita"
                                className="text-gray-400 hover:text-cyan-400 transition"
                            >
                                <Code2 className="w-5 h-5" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* --- 下部コピーライトエリア --- */}
            <div className="border-t border-cyan-900/40 mt-10 pt-4 text-center text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Yuu Ohnuki. All Rights Reserved. <br />
                Built with <span className="text-cyan-400">Next.js</span> ×{' '}
                <span className="text-cyan-400">Tailwind CSS</span> × <span className="text-cyan-400">Vercel</span>.
            </div>
        </footer>
    );
};

export default Footer;
