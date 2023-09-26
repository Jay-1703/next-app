'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Login from './pages/login/page';

export default function Home() {
  const { data:session } = useSession();
  if (session) {
    const router = useRouter();
    router.push('/components/dashboard/');
}
  return (
    <main>
        <Login/>
    </main>
  )
}
