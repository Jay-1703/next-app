'use client';
import * as React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { signIn, getProviders } from 'next-auth/react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Signin() {
    const [providers, setProviders] = React.useState([]);
    const { data: session } = useSession();

    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

// ------------- Get providers --------------
    React.useEffect(() => {
        const setUpProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        }
        setUpProviders();
    }, [])

// ------------- Signin --------------
    const Signin = async () => {
        try {
            if (email === null || password === null) {
                document.getElementById('email').classList.add('border-rose-600');
                document.getElementById('password').classList.add('border-rose-600');
            } else {
                const signInResponse = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });
                console.log("Response ", signInResponse);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (session) {
        const router = new useRouter();
        router.push('/dashboard');
    }
    return (
        <section className="bg-[#F4F7FF] py-16">
            <div className="container mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full px-4">
                        <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]">
                            <div className="text-center mb-7 text-2xl font-semibold text-black">
                                <p>Sign In</p>
                            </div>
                            <div>
                                <div className="mb-6">
                                    <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" id="email" placeholder="Email" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-gray-700 placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
                                </div>
                                <div className="mb-6">
                                    <input onChange={(e) => { setPassword(e.target.value) }} type="password" name='password' id='password' placeholder="Password" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-gray-700 placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none" />
                                </div>
                                <div className="mb-6">
                                    <button onClick={Signin} type="button" className="bordder-blue-600 w-full cursor-pointer rounded-md border bg-blue-600 py-3 px-5 text-base text-white transition hover:bg-opacity-90">Sign in</button>
                                </div>
                            </div>
                            <p className="mb-6 text-base text-[#adadad]">Or</p>
                            <ul className="-mx-2 mb-12 flex justify-between">
                                <li className="w-full px-2">
                                    <button onClick={() => signIn('google')} className="flex w-full h-11 items-center justify-center rounded-md bg-[#D64937] hover:bg-opacity-90">
                                        <svg className="w-4 h-4 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 18 19">
                                            <path fillRule="evenodd" d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>

                                <li className="w-full px-2">
                                    <button onClick={() => signIn('github')} className="flex w-full h-11 items-center justify-center rounded-md bg-[#323232] hover:bg-opacity-90">
                                        <svg className="w-4 h-4 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                            <div className='flex'>
                                <p className="text-base text-[#adadad]">
                                    I don't have a account?
                                    <Link href="/signup" className="text-blue-400 hover:underline">
                                        Signup
                                    </Link>
                                </p>
                                <Link href="#" className="grow mb-0 inline-block text-base text-[#adadad] hover:text-primary hover:underline">
                                    Forget Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}