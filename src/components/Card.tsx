import {
  Card as BaseCard,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  content: string;
  footer: string;
}

export function Card({ title, content, footer }: Props) {
  return (
    <BaseCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </BaseCard>
  );
}
