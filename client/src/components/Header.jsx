//imports
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <div className="flex justify-between">
      <Link to={"/"}>Form oluştur</Link >
      <Link to={"/formmanage"}>Formları listele.</Link >
    </div>
  )
}
