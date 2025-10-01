import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

interface ProductCatalogProps {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  filteredProducts: Product[];
}

export default function ProductCatalog({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  filteredProducts
}: ProductCatalogProps) {
  return (
    <section id="catalog" className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-br from-red-100 via-yellow-50 to-green-100 rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
        <h2 className="text-5xl font-black text-center mb-4 flex items-center justify-center gap-3">
          <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
          <span className="bg-gradient-to-r from-primary via-secondary to-red-600 bg-clip-text text-red-600">Наш Ассортимент</span>
          <Icon name="Sparkles" size={48} className="text-secondary animate-pulse" />
        </h2>
        <p className="text-center text-xl text-muted-foreground mb-8">🎁 Более 1000 уникальных подарков для ваших близких 🎁</p>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 shadow-2xl border-2 border-primary/20 bg-gradient-to-br from-white to-yellow-50">
              <CardContent className="p-6">
                <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                  <Icon name="Filter" size={24} className="text-primary" />
                  Фильтры
                </h3>

                <div className="mb-6">
                  <h4 className="font-bold mb-3 text-lg">📂 Категории</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className={`w-full justify-start font-semibold ${selectedCategory === category ? 'bg-gradient-to-r from-primary to-red-600' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-3 text-lg">💰 Цена: {priceRange[0]} - {priceRange[1]} ₽</h4>
                  <Slider
                    min={0}
                    max={15000}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-4"
                  />
                </div>
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-primary/20 hover:border-primary/50 bg-gradient-to-br from-white to-red-50">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg bg-muted h-48">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 right-3 bg-gradient-to-r from-secondary to-yellow-400 text-secondary-foreground shadow-lg font-bold">
                        <Icon name="Star" size={14} className="mr-1" />
                        {product.rating}
                      </Badge>
                      <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold">ХИТ 🔥</div>
                    </div>
                    <div className="p-4">
                      <Badge variant="outline" className="mb-2 border-primary text-primary font-semibold">{product.category}</Badge>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-center">
                        <span className="text-2xl font-black bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">{product.price} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}