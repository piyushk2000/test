export default function ConditionallyRender({
  render,
  children,
}: {
  render?: boolean;
  children: JSX.Element;
}) {
  return <>{render ? children : null}</>;
}
