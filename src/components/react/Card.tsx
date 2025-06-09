import {
  Card as BaseCard,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

interface Props {
  title: string;
  content: React.ReactNode;
  footer: string;
  onClick?: () => void;
}

export function Card({ title, content, footer, onClick }: Props) {
  return (
    <BaseCard onClick={onClick}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="text-center self-center">{footer}</CardFooter>
    </BaseCard>
  );
}
