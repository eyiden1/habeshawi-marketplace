type PageHeaderProps = {
  title: string;
  description: string;
};

export default function PageHeader({
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="mb-10 border-b border-slate-200 pb-6">
      <h1 className="text-5xl font-extrabold text-[#064d2b]">
        {title}
      </h1>

      <p className="mt-3 max-w-3xl text-lg text-slate-600">
        {description}
      </p>
    </div>
  );
}