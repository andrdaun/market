import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import './Product.css';
import { ProductType } from './types';

type Props = {
	product: ProductType;
	onRemove: (id: number) => void;
	onChangeCount: (id: number, count: number) => void;
};

export const Product = ({ product, onRemove, onChangeCount }: Props) => {
	return (
		<div className='product'>
			<img className='product-photo' src={product.thumbnail} />
			<div className='product-content'>
				<div className='product-content-lef'>
					<h3>{product.title}</h3>
					<h5>Стоимость: {product.price} руб.</h5>
				</div>
				<div className='product-content-right'>
					<div
						className='product-content-right-remove'
						onClick={() => onChangeCount(product.id, 0)}
					>
						<DeleteOutlined />
					</div>
					<div className='product-content-right-count'>
						{product.quantity}
						<Button
							icon={<PlusOutlined />}
							disabled={product.quantity >= 10}
							onClick={() => onChangeCount(product.id, product.quantity + 1)}
						/>
						<Button
							icon={<MinusOutlined />}
							disabled={product.quantity <= 1}
							onClick={() => onChangeCount(product.id, product.quantity - 1)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
