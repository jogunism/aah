export default function Footer() {
  return (
    <footer className="w-full bg-[#DF7B7B] text-center px-6 py-4 border-t border-gray-300">
      <div className="mb-2 flex items-center justify-center">
        {/* Added margin-top for spacing */}
        <a
          href="https://www.instagram.com/aah_education_official"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white hover:text-gray-200 text-sm"
        >
          Instagram
        </a>
        <span className="mx-2 text-white">|</span> {/* Separator */}
        <a
          href="https://aah-e.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-white hover:text-gray-200 text-sm"
        >
          aah-e.net
        </a>
      </div>
      <p className="text-gray-800 text-sm text-white">
        © 2025 aah! education Europe. All rights reserved.
      </p>
    </footer>
  );
}
