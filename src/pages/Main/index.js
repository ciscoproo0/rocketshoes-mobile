import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

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

class Main extends Component {
  state = {
    products: [],
  };

  static propTypes = {
    addToCartRequest: PropTypes.func.isRequired,
    amount: PropTypes.string.isRequired,
  };

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map((product) => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }));
    this.setState({ products: data });
  }

  handleAddProduct = (id) => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <Container>
        {products.map((product) => (
          <Product key={product.id}>
            <ProductImage source={{ uri: product.image }} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>{product.priceFormatted}</ProductPrice>
            <AddButton onPress={() => this.handleAddProduct(product.id)}>
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
}

const mapStateToProps = (state) => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
