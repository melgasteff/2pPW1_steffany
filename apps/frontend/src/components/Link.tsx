interface Props {
  url: string
}

const Link = ({url}: Props) => {
  return (
    <div>
      <a target="blank" href={url}>Ir</a>
    </div>
  )
}

const Link2 = ({ url }: Props) => {
  return (
    <div>
      <a target="blank" href={url}>Ir2</a>
    </div>
  )
}
// export default Link
export { Link, Link2 }
