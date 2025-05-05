
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  ChevronDown,
  FileText,
  Save,
  X
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  faqs: FAQ[];
}

const KnowledgeBase = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "c1",
      name: "Product Information",
      faqs: [
        {
          id: "f1",
          question: "What materials are your products made from?",
          answer: "Our products are made from high-quality materials sourced from sustainable suppliers. We use organic cotton for clothing, recycled metals for jewelry, and sustainably harvested wood for furniture.",
          category: "c1",
        },
        {
          id: "f2",
          question: "Do you offer custom product designs?",
          answer: "Yes, we offer custom product designs for most of our items. Please contact our customer service team for more details on customization options and pricing.",
          category: "c1",
        },
      ],
    },
    {
      id: "c2",
      name: "Shipping & Delivery",
      faqs: [
        {
          id: "f3",
          question: "How long does shipping take?",
          answer: "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination country and customs processing.",
          category: "c2",
        },
        {
          id: "f4",
          question: "Do you ship internationally?",
          answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping calculator at checkout for precise information.",
          category: "c2",
        },
      ],
    },
    {
      id: "c3",
      name: "Returns & Refunds",
      faqs: [
        {
          id: "f5",
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Please fill out the return form included in your package or available on our website.",
          category: "c3",
        },
        {
          id: "f6",
          question: "How do I get a refund?",
          answer: "Once your return is received and inspected, we will process your refund within 3-5 business days. Refunds will be issued to the original payment method used for purchase.",
          category: "c3",
        },
      ],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [newFaqCategory, setNewFaqCategory] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");

  const filteredCategories = categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const startNewFaq = (categoryId: string) => {
    setNewFaqCategory(categoryId);
    setEditedQuestion("");
    setEditedAnswer("");
  };

  const cancelNewFaq = () => {
    setNewFaqCategory(null);
  };

  const saveNewFaq = () => {
    if (!newFaqCategory || !editedQuestion.trim() || !editedAnswer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    const newFaq: FAQ = {
      id: `f${Date.now()}`,
      question: editedQuestion,
      answer: editedAnswer,
      category: newFaqCategory
    };

    setCategories(categories.map(category => 
      category.id === newFaqCategory
        ? { ...category, faqs: [...category.faqs, newFaq] }
        : category
    ));

    setNewFaqCategory(null);
    setEditedQuestion("");
    setEditedAnswer("");
    toast.success("FAQ added successfully");
  };

  const startEdit = (faq: FAQ) => {
    setEditingFaq(faq.id);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer);
  };

  const cancelEdit = () => {
    setEditingFaq(null);
  };

  const saveEdit = (faqId: string, categoryId: string) => {
    if (!editedQuestion.trim() || !editedAnswer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }

    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            faqs: category.faqs.map(faq => 
              faq.id === faqId
                ? { ...faq, question: editedQuestion, answer: editedAnswer }
                : faq
            )
          }
        : category
    ));

    setEditingFaq(null);
    toast.success("FAQ updated successfully");
  };

  const deleteFaq = (faqId: string, categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { ...category, faqs: category.faqs.filter(faq => faq.id !== faqId) }
        : category
    ));
    
    toast.success("FAQ deleted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Category
        </Button>
      </div>

      {filteredCategories.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No FAQs found matching your search</p>
            {searchTerm && (
              <Button variant="link" onClick={() => setSearchTerm("")}>
                Clear search
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        filteredCategories.map((category) => (
          <Card key={category.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <span>{category.name}</span>
                <Button variant="ghost" size="sm" onClick={() => startNewFaq(category.id)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {newFaqCategory === category.id && (
                <div className="border rounded-lg p-4 mb-4 bg-primary/5">
                  <Input 
                    placeholder="Question" 
                    value={editedQuestion} 
                    onChange={(e) => setEditedQuestion(e.target.value)} 
                    className="mb-3"
                  />
                  <Textarea 
                    placeholder="Answer" 
                    value={editedAnswer} 
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="mb-3"
                    rows={4}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelNewFaq}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={saveNewFaq}>
                      <Save className="h-4 w-4 mr-2" />
                      Save FAQ
                    </Button>
                  </div>
                </div>
              )}
              
              <Accordion type="multiple" className="w-full">
                {category.faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="hover:no-underline">
                      {editingFaq === faq.id ? (
                        <Input 
                          value={editedQuestion} 
                          onChange={(e) => setEditedQuestion(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 mr-2"
                        />
                      ) : (
                        <span>{faq.question}</span>
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      {editingFaq === faq.id ? (
                        <div className="space-y-3">
                          <Textarea 
                            value={editedAnswer} 
                            onChange={(e) => setEditedAnswer(e.target.value)}
                            rows={4}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={cancelEdit}>
                              <X className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                            <Button size="sm" onClick={() => saveEdit(faq.id, category.id)}>
                              <Save className="h-4 w-4 mr-2" />
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-muted-foreground pb-2">{faq.answer}</p>
                          <div className="flex justify-end gap-2 pt-2">
                            <Button size="sm" variant="ghost" onClick={() => startEdit(faq)}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button size="sm" variant="ghost" className="text-red-500" onClick={() => deleteFaq(faq.id, category.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default KnowledgeBase;
