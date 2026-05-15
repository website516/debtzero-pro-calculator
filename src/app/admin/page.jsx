import SEO from '../../components/SEO';

export default function Admin() {
  return (
    <>
      <SEO title="Admin" />
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-semibold mb-6">Admin Dashboard</h1>
        <p className="text-xl text-slate-600">此功能尚未開放。如需要管理權限，請聯絡 support@debtzero.pro</p>
      </div>
    </>
  );
}