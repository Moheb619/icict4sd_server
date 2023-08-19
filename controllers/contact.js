import prisma from "../utils/prisma.js";

export const allContactUs = async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({});
    return res.status(200).json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
};
export const newContactUs = async (req, res, next) => {
  try {
    const body = req.body;
    const response = await prisma.contact.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        message: body.message,
        markedAsOkay: false,
      },
    });
    return res.status(200).json({
      status: "success",
      message: "Contact Form Submitted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const updateContactUs = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    const response = await prisma.contact.update({
      where: {
        id: contactId,
      },
      data: {
        markedAsOkay: body.markedAsOkay,
      },
    });
    return res.status(201).json({
      status: "success",
      message: "Contact Form Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteContactUs = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const response = await prisma.contact.delete({ where: { id: contactId } });
    return res.status(200).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
