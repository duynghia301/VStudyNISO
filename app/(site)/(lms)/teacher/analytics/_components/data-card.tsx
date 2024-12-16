import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({
  value,
  label,
  shouldFormat = false, 
}: DataCardProps) => {
  const formattedValue = shouldFormat ? value.toLocaleString() : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">
          {formattedValue}
        </p>
      </CardContent>
    </Card>
  );
};
