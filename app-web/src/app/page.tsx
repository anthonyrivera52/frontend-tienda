import { redirect } from 'next/navigation';
import { i18nConfig } from '../core/i18n/config';

export default function Home() {
  redirect(`/${i18nConfig.defaultLocale}`);
}