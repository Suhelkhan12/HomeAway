import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/Fromcontainer";
import { createPropertyAction } from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";

function CreateProperty() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-6 sm:p-8 rounded-md">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={createPropertyAction}>
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (20 limit)"
              placeholder="Cabin in Latvia"
            />
            <FormInput
              name="tagline"
              type="text "
              label="Tagline (30 limit)"
              placeholder="Dream Getaway Awaits You Here!"
            />
            <PriceInput />
            {/* categories */}
            <CategoriesInput defaultValue="" />
          </div>
          {/* text area / description */}
          <SubmitButton text="create rental" classname="mt-6" />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreateProperty;
