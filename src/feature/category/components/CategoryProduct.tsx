import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CustomCheckBox from "../../../components/checkbox/CustomCheckbox";
import { Close } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { COLORS, STORAGES } from "../../../assets/fake-data/attribute";
import { CateCategoryProps, CategoryProps } from "../../../types/category";
import { CateColorProps } from "../../../types/color";
import { CateStorageProps } from "../../../types/storage";
import { ProductProps } from "../../../types/product";
import productApi from "../../../api/productApi";
import ListProduct from "../../product/components/ListProduct";
import { useParams } from "react-router-dom";

type InitFilterProps = {
  category: CateCategoryProps[];
  color: CateColorProps[];
  storage: CateStorageProps[];
};

export default function CategoryProduct() {
  const params: any = useParams();
  const categories: CategoryProps[] = useSelector(
    (state: any) => state.category.categories
  );
  const [loading, setLoading] = useState(false);
  const [listProduct, setListProduct] = useState<ProductProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
      const res = await productApi.getAll();
      setListProduct(res.data);
			setProducts(res.data);
			setLoading(false);
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initFilter: InitFilterProps = {
    category: [],
    color: [],
    storage: [],
  };

  const [filter, setFilter] = useState<InitFilterProps>(initFilter);

  const filterSelect = (type: string, checked: boolean, item: any) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.category_slug],
          });
          break;
        case "COLOR":
          setFilter({
            ...filter,
            color: [...filter.color, item.color],
          });
          break;
        case "STORAGE":
          setFilter({
            ...filter,
            storage: [...filter.storage, item.storage],
          });
          break;
        default:
          break;
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (value) => value !== item.category_slug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((value) => value !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "STORAGE":
          const newStorage = filter.storage.filter(
            (value) => value !== item.storage
          );
          setFilter({ ...filter, storage: newStorage });
          break;
        default:
          break;
      }
    }
  };

  const updateProduct = useCallback(() => {
    let newProduct = listProduct;
    if (params?.slug) {
      filter.category.push(params?.slug);
    } 
		if (filter.category.length > 0) {
			newProduct = newProduct.filter((value: any) =>
				filter.category.includes(value?.category?.category_slug)
			);
		}

		// if (filter?.color.length > 0) {
		//   newProduct = newProduct.filter((value: any) => {
		//     const check = value?.color.find((color: any) =>
		//       filter.color.includes(color)
		//     );
		//     return check !== undefined;
		//   });
		// }

		// if (filter?.storage.length > 0) {
		//   newProduct = newProduct.filter((value: any) => {
		//     const check = value?.storage.find((storage: any) => filter.storage.includes(storage));
		//     return check !== undefined;
		//   });
		// }
    
    console.log(filter);

    setProducts(newProduct);
  }, [filter, listProduct, params]);

  useEffect(() => {
    updateProduct();
  }, [updateProduct]);

  const filterRef: any = useRef(null);
  const handleFilterToggle = () => filterRef.current.classList.toggle("active");

  const clearFilter = () => setFilter(initFilter);

  return (
    <div className="catalog">
      <div className="catalog__filter-toggle">
        <div className="widget-content" onClick={() => handleFilterToggle()}>
          <Button size="small">Bộ lọc</Button>
        </div>
      </div>
      <div className="row">
        <div className="catalog__filter col-2" ref={filterRef}>
          <div
            className="catalog__filter-close"
            onClick={() => handleFilterToggle()}
          >
            <Close />
          </div>
          <div className="catalog__filter-widget">
            <div className="widget-title">danh mục sản phẩm</div>
            <div className="widget-content">
              {categories.map((item, index) => {
                return (
                  <div className="widget-content__item" key={index}>
                    <CustomCheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, item)
                      }
                      checked={filter.category.includes(
                        item.category_slug as any
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="catalog__filter-widget">
            <div className="widget-title">màu sắc</div>
            <div className="widget-content">
              {COLORS.map((item: any, index) => {
                return (
                  <div className="widget-content__item" key={index}>
                    <CustomCheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("COLOR", input.checked, item)
                      }
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="catalog__filter-widget">
            <div className="widget-title">kích thước</div>
            <div className="widget-content">
              {STORAGES.map((item: any, index) => {
                return (
                  <div className="widget-content__item" key={index}>
                    <CustomCheckBox
                      label={item.name}
                      onChange={(input) =>
                        filterSelect("STORAGE", input.checked, item)
                      }
                      checked={filter.storage.includes(item.storage)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="catalog__filter-widget">
            <div className="widget-content">
              <Button size="small" variant="contained" onClick={clearFilter}>
                Xóa bộ lọc
              </Button>
            </div>
          </div>
        </div>

        <div className="catalog__content col-10">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <>
              {products.length > 0 ? (
                <ListProduct product={products} count={3} />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography fontSize={24} color="#2e86de">
                    Không có sản phẩm nào.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
