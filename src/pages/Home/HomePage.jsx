import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { productsAPI, categoriesAPI } from "../../api/services";
import ProductCard from "../../components/product/ProductCard";

const { Title, Text } = Typography;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productsAPI.getAll({ ordering: "-created_at" }),
          categoriesAPI.getAll(),
        ]);
        setProducts(prodRes.data.results || []);
        setCategories(catRes.data.data || []);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <div
        className="flex justify-center items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spin size="large" />
      </div>
    );

  return (
    <div>
      {/* Hero Banner */}
      <div
        className="flex items-center justify-center text-center px-4"
        style={{
          minHeight: 520,
          background:
            "linear-gradient(135deg, #6366f1 0%, #4f46e5 60%, #3730a3 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="flex justify-center" style={{ marginBottom: 28 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.97)",
                borderRadius: 24,
                padding: "18px 32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/logo.png"
                alt={process.env.REACT_APP_NAME || "متجري"}
                style={{
                  height: 64,
                  maxWidth: 220,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          </div>

          <Text
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 18,
              display: "block",
              marginBottom: 32,
            }}
          >
            اكتشف أفضل المنتجات بأفضل الأسعار
          </Text>
          <Link to="/products">
            <Button
              type="default"
              size="large"
              icon={<ArrowLeftOutlined />}
              style={{
                fontWeight: 600,
                paddingInline: 28,
                height: 48,
                borderRadius: 12,
              }}
            >
              تسوق الآن
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <Title level={3} style={{ margin: 0 }}>
                تسوق حسب الفئة
              </Title>
            </div>
            <Row gutter={[16, 16]}>
              {categories.map((cat) => (
                <Col key={cat.id} xs={12} sm={8} md={6} lg={4}>
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="no-underline"
                  >
                    <div
                      className="text-center p-4 bg-white rounded-2xl border border-slate-100 hover:border-indigo-300 hover:shadow-lg transition-all cursor-pointer"
                      style={{ height: "100%" }}
                    >
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-14 h-14 object-cover rounded-full mx-auto mb-3"
                        />
                      ) : (
                        <div
                          className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, #6366f1, #4f46e5)",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 18,
                          }}
                        >
                          {cat.name?.charAt(0)}
                        </div>
                      )}
                      <Text strong className="text-sm">
                        {cat.name}
                      </Text>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Latest Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Title level={3} style={{ margin: 0 }}>
              أحدث المنتجات
            </Title>
            <Link to="/products">
              <Button type="link" icon={<ArrowLeftOutlined />}>
                عرض الكل
              </Button>
            </Link>
          </div>
          <Row gutter={[20, 20]}>
            {products.slice(0, 8).map((product) => (
              <Col key={product.id} xs={12} sm={8} md={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
