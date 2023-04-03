import React from "react";
import { MdChevronRight, MdOutlineChevronRight } from "react-icons/md";

interface ObrasciSectionProps {
  className?: string;
}

const ObrasciSection: React.FC<ObrasciSectionProps> = (props) => {
  return (
    <div className={props.className}>
      <h5 className="uppercase tracking-wide font-medium">Obrasci</h5>
      <p className="text-sm text-light mt-2">
        a korištenje usluga Student servisa Zagreb naručitelj (poslodavac) treba
        biti registriran u bazi Student servisa Zagreb. Registracija se obavlja
        popunjavanjem obrasca Obrazac za prijavu poslodavaca i dostavlja Student
        servisu poštom, osobno ili na e-mail{" "}
        <a href="mailto:referada@sczg.hr" className="text-primary">
          referada@sczg.hr
        </a>
      </p>
      <p className="mt-3 text-light text-sm">
        Ako naručitelj (poslodavac) ima potrebu za zapošljavanjem studenata i
        želi objaviti oglas na web stranici Student servisa Zagreb, treba
        ispuniti obrazac Potražnja studenata za rad i poslati ga na e-mail{" "}
        <a href="mailto:referada@sczg.hr" className="text-primary">
          referada@sczg.hr
        </a>
      </p>
      <div className="mt-3">
        <a
          href="/dokumenti/poslovi/upitnik.pdf"
          className="border-b py-3 px-1 hover:bg-gray-50 transition-colors text-medium text-medium flex items-center justify-between"
        >
          <span className="flex-1">Obrazac za prijavu poslodavaca</span>
          <MdChevronRight size={20} />
        </a>
        <a
          href="/dokumenti/poslovi/upitnik_promjena_podataka.pdf"
          className="border-b py-3 px-1 hover:bg-gray-50 transition-colors text-medium text-medium flex items-center justify-between"
        >
          <span className="flex-1">
            Obrazac za promjenu podataka o poslodavcu
          </span>
          <MdChevronRight size={20} />
        </a>
        <a
          href="/dokumenti/poslovi/potraznja_studenata_za_rad.doc"
          className="border-b py-3 px-1 hover:bg-gray-50 transition-colors text-medium text-medium flex items-center justify-between"
        >
          <span className="flex-1">Potražnja studenata za rad</span>
          <MdChevronRight size={20} />
        </a>
      </div>
    </div>
  );
};

export default ObrasciSection;
