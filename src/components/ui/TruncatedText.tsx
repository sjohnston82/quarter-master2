interface TruncatedTextProps {
  text: string;
  maxLength: number;
  classes?: string;
}

export function TruncatedText({ text, maxLength, classes }: TruncatedTextProps) {
  if (text.length <= maxLength) {
    return <span className={classes}>{text}</span>;
  }

  const truncated = text.slice(0, maxLength) + "...";

  return <span className={classes}>{truncated}</span>;
}
