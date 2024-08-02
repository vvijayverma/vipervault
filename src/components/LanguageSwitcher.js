// components/LanguageSwitcher.js
'use client';

import { useRouter,usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const locales = ['en', 'fr', 'es'];
  const currentPath = router.asPath;
  console.log(currentPath);

  const changeLocale = (locale) => {
    console.log(locale,"fgfg");
     router.push(`/${locale}${pathname}`);
  };

  return (
    <div className='flex gap-10 justify-around'>
      {locales?.map((locale) => (
        <button key={locale} onClick={() => changeLocale(locale)} className='p-8 m-8'>
          {locale}
        </button>
      ))}
    </div>
  );
}
