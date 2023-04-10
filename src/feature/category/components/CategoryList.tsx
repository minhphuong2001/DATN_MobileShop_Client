import { Box, Grid } from "@mui/material";
import React from "react";

type Props = {
  title: string;
	image: string;
	background: string;
};

type CateProps = {
  data: Props[];
};

export function CategoryCard({ title, image, background }: Props) {
  return (
    <div className="category-card" style={{ backgroundColor: background}}>
      <div className="category-card__title">{title}</div>
			<div className="category-card__image">
				<img src={image} alt=""/>
			</div>
    </div>
  );
}

export default function CategoryList({ data }: CateProps) {
  return (
		<div className="category container">
			<p className="category-title">danh mục sản phẩm</p>
      <Box>
        <Grid container spacing={2}>
          {data.map((item, index) => {
            return (
              <Grid item xs={1} key={index}>
                <CategoryCard
                  title={item.title}
									image={item.image}
									background={item.background}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}
