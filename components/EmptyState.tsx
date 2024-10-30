interface Props {
  message?: string;
}

export default function EmptyState({ message = "No data available" }: Props) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center text-gray-600">
      <p className="text-lg">{message}</p>
    </div>
  );
}
