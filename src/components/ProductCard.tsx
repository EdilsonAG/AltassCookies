import { ShoppingCart, ImageOff } from 'lucide-react'
import type { Produto } from '../types'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

interface Props {
  produto: Produto
  onToast?: (msg: string, type?: 'success' | 'error') => void
}

export default function ProductCard({ produto, onToast }: Props) {
  const { adicionarItem } = useCart()
  const imagem = produto.produtoImagemResponses?.[0]?.url

  const handleAdd = async () => {
    try {
      await adicionarItem(produto.id)
      onToast?.(`${produto.nome} adicionado ao carrinho!`, 'success')
    } catch {
      onToast?.('Erro ao adicionar ao carrinho.', 'error')
    }
  }

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {imagem ? (
          <img src={imagem} alt={produto.nome} className="product-card__image" />
        ) : (
          <div className="product-card__no-image">
            <ImageOff size={40} color="var(--sand)" />
          </div>
        )}
      </div>

      <div className="product-card__body">
        <h3 className="product-card__name">{produto.nome}</h3>
        <p className="product-card__price">
          {produto.preco != null
            ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
            : 'Consultar preço'}
        </p>
        <button className="btn-primary product-card__btn" onClick={handleAdd}>
          <ShoppingCart size={16} />
          Adicionar
        </button>
      </div>
    </article>
  )
}
