import {
  Card as BaseCard,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  title: string;
  cardContent: React.ReactNode;
  footer: string;
}

type CardProps = Props & React.ComponentProps<"div">;

export function Card({ title, cardContent, footer, onClick }: CardProps) {
  return (
    <BaseCard onClick={onClick}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
      <CardFooter className="text-center self-center">{footer}</CardFooter>
    </BaseCard>
  );
}
