import type { Post, PostsMeta } from "@/features/types";
import React from "react";
import DisplayHTML from "../elements/DisplayHTML";
import Spinner from "../elements/Spinner";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

interface DnevniMenuSectionProps {
  className?: string;
  menus: Post<PostsMeta>[] | undefined;
  loading?: boolean;
}

const meals: { field_name: "dorucak" | "rucak" | "vecera"; title: string }[] = [
  { field_name: "dorucak", title: "Doručak" },
  { field_name: "rucak", title: "Ručak" },
  { field_name: "vecera", title: "Večera" },
];

const types: {
  field_name: "menu" | "vege_menu" | "izbor" | "prilozi";
  title: string;
}[] = [
  { field_name: "menu", title: "Menu" },
  { field_name: "vege_menu", title: "Vegeterijanski menu" },
  { field_name: "izbor", title: "Izbor" },
  { field_name: "prilozi", title: "Prilozi" },
];

const DnevniMenuSection: React.FC<DnevniMenuSectionProps> = (props) => {
  return (
    <section className={props.className}>
      <SectionTitle title="Dnevni meni" className="mt-24" />
      {props.loading ? (
        <div className="py-6">
          <Spinner className="mx-auto" />
        </div>
      ) : !!props.menus && props.menus.length <= 0 ? (
        <div className="text-light text-center py-8">Nema menija za prikaz</div>
      ) : (
        props.menus?.map((menu) => {
          const menu_products = menu.meta.menu_products;
          if (Array.isArray(menu_products)) return null;
          return (
            <div key={menu.id}>
              <div className="mb-4">
                <DisplayHTML
                  html={menu.title.rendered}
                  className="text-xl font-medium text-text"
                />
              </div>
              {meals.map((meal) => {
                if (!menu_products[meal.field_name]) return null;
                return (
                  <Card key={meal.field_name} className="!bg-[#fafafa] mb-6">
                    <div className="text-xl text-primary font-semibold mb-3">
                      {meal.title}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {types.map((type) => {
                        if (!menu_products[meal.field_name]?.[type.field_name])
                          return null;
                        return (
                          <div key={type.field_name} className="flex-1">
                            <div className="font-semibold border-b py-2">
                              {type.title}
                            </div>
                            <div>
                              {menu_products[meal.field_name]?.[
                                type.field_name
                              ]?.map((product) => {
                                return (
                                  <div
                                    key={product.id}
                                    className="border-b py-2"
                                  >
                                    {product.title}
                                    <span className="text-gray-400">
                                      {product.weight
                                        ? ` | ${product.weight}g`
                                        : ""}
                                      {product.allergens
                                        ? ` | (${product.allergens})`
                                        : " | (-)"}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          );
        })
      )}
    </section>
  );
};

export default DnevniMenuSection;
