import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

export default function Main() {
  const [products, setProducts] = useState([]);

  const amount = useSelector((state) =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {}),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map((product) => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  return (
    <Container>
      {products.map((product) => (
        <Product key={product.id}>
          <ProductImage source={{ uri: product.image }} />
          <ProductTitle>{product.title}</ProductTitle>
          <ProductPrice>{product.priceFormatted}</ProductPrice>
          <AddButton onPress={() => handleAddProduct(product.id)}>
            <ProductAmount>
              <Icon name="add-shopping-cart" color="#FFF" size={20} />
              <ProductAmountText>{amount[product.id] || 0}</ProductAmountText>
            </ProductAmount>
            <AddButtonText>ADICIONAR</AddButtonText>
          </AddButton>
        </Product>
      ))}
    </Container>
  );
}
