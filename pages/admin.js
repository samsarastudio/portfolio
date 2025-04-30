import Head from 'next/head';
import AdminDashboard from '../components/AdminDashboard';

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin Dashboard | Portfolio</title>
        <meta name="description" content="Admin dashboard for managing portfolio projects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AdminDashboard />
    </>
  );
} 