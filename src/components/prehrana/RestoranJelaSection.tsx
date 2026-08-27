import Image from "next/image";
import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import Button from "../elements/Button";
import { useUI, type UIKey } from "@/utils/ui";

interface RestoranJelaProps {
  className?: string;
}

const buildAlergeni = (ui: (key: UIKey) => string) => [
  {
    label: "A",
    description: ui("allergen.gluten"),
  },
  {
    label: "B",
    description: ui("allergen.crustaceans"),
  },
  {
    label: "C",
    description: ui("allergen.eggs"),
  },
  {
    label: "D",
    description: ui("allergen.fish"),
  },
  {
    label: "E",
    description: ui("allergen.peanuts"),
  },
  {
    label: "F",
    description: ui("allergen.soy"),
  },
  {
    label: "G",
    description: ui("allergen.milk"),
  },
  {
    label: "H",
    description: ui("allergen.nuts"),
  },
  {
    label: "I",
    description: ui("allergen.celery"),
  },
  {
    label: "J",
    description: ui("allergen.mustard"),
  },
  {
    label: "K",
    description: ui("allergen.sesame"),
  },
  {
    label: "L",
    description: ui("allergen.sulphites"),
  },
  {
    label: "M",
    description: ui("allergen.lupin"),
  },
  {
    label: "N",
    description: ui("allergen.molluscs"),
  },
  {
    label: "*",
    description: ui("allergen.mayContain"),
  },
];

const RestoranJelaSection: React.FC<RestoranJelaProps> = (props) => {
  const ui = useUI();
  const alergeni = buildAlergeni(ui);
  const [modalOpened, setModalOpened] = React.useState(false);

  useEffect(() => {
    document.body.style.overflow = modalOpened ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalOpened]);

  return (
    <section className={props.className}>
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <h3 className="text-[38px] text-text font-semibold leading-normal">
            {ui("food.prepared")}
          </h3>
          <p className="mt-4 text-light leading-relaxed">
            {ui("food.quality")}
          </p>
          <Button
            className="mt-6"
            onClick={() => setModalOpened((isOpened) => !isOpened)}
          >
            {ui("common.allergens")}
          </Button>
        </div>
        <div className="flex-1">
          <Image
            src="/slike/prehrana/restoran_jela.png"
            alt={ui("nutrition.importance")}
            width={400}
            height={360}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {modalOpened && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 overflow-y-scroll"
            onClick={() => setModalOpened(false)}
          ></div>
          <div className="p-6 w-[90%] sm:w-3/4 md:w-2/3 max-h-[90%] overflow-y-auto rounded-lg fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 z-50 bg-white">
            <div className="flex item-center justify-between">
              <h5 className="text-xl font-medium">{ui("common.allergens")}</h5>
              <button
                onClick={() => setModalOpened(false)}
                className="p-1 hover:bg-gray-100 active:bg-gray-200 rounded-full"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="w-full mt-4">
              {alergeni.map((alergen) => (
                <div key={alergen.label} className="flex items-center gap-2">
                  <span className="mr-2 text-text font-medium">
                    {alergen.label}
                  </span>
                  <span className="mr-2 text-light border-b border-gray-200 py-2 flex-1">
                    {alergen.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default RestoranJelaSection;
