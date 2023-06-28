import { Tooltip } from "@mui/material";

interface TruncatedTextProps {
  text: string;
  maxLength: number;
  classes?: string;
  children: React.ReactNode;
}

export function TruncatedText({
  text,
  maxLength,
  classes,
}: TruncatedTextProps) {
  if (text.length <= maxLength) {
    return <span className={classes}>{text}</span>;
  }

  const truncated = text.slice(0, maxLength) + "...";

  return (
    <Tooltip title={text} placement="top">
      <span className={classes}>{truncated}</span>
    </Tooltip>
  );
}
