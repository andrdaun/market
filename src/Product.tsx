import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import "./Product.css";
import { ProductType } from "./types";

type Props = {
  product: ProductType;
  onRemove: (id: number) => void;
  onChangeCount: (id: number, count: number) => void;
};

export const Product = ({ product, onRemove, onChangeCount }: Props) => {
  return (
    <div className="product">
      <div className="product-content">
        <div className="product-content-left">
          <Card
            style={{ width: 240 }}
            cover={<img alt="example" src={product.thumbnail} />}
          >
            <Meta title={product.title} description={product.title} />
            <h1>Price: {product.price}</h1>
          </Card>
        </div>
        <div className="product-content-right">
          <div
            className="product-content-right-remove"
            onClick={() => onChangeCount(product.id, 0)}
          >
            <DeleteOutlined />
          </div>
          <div className="product-content-right-count">
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
