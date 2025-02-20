import { Link } from "react-router-dom";

const Item = ({ id, name, price, thumbnail }) => {
  return (
    <Link
      to={`/item/${id}`}
      className='bg-white m-2 p-2 rounded-lg w-[19rem] inline-block shadow cursor-pointer hover:animate-spin-slow'
    >
      <div className='flex justify-center	w-auto'>
        <img className='h-64' src={thumbnail} alt='Miniatura del producto' />
      </div>
      <br />
      <hr />
      <h3 className='text-xl font-bold inline-block'>{name}</h3>
      <br />
      <h4 className='text-2xl font-bold text-blue-400 inline-block'>{price}</h4>
    </Link>
  );
};
export default Item;
