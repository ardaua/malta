$(document).ready(function(){
	
	var items = $('#stage li'),
		itemsByTags = {};
	
	// Цикл по всем элементам li:
	
	items.each(function(i){
		var elem = $(this),
			tags = elem.data('tags').split(',');
		
		// Добавляем атрибут data-id. Требуется плагином Quicksand:
		elem.attr('data-id',i);
		
		$.each(tags,function(key,value){
			
			// Удаляем лишние пробелы:
			value = $.trim(value);
			
			if(!(value in itemsByTags)){
				// Cоздаем пустой массив для пунктов:
				itemsByTags[value] = [];
			}
			
			// Каждый пункт добавляется в один массив по ярлыку:
			itemsByTags[value].push(elem);
		});
		
	});

	// Создаем опцию "Все" в меню:
	createList('Все фото',items);

	// Цикл по массивам в itemsByTags:
	$.each(itemsByTags,function(k,v){
		createList(k,v);
	});
	
	$('#filter a').live('click',function(e){
		var link = $(this);
		
		link.addClass('active').siblings().removeClass('active');
		
		// Используем плагин Quicksandдля анимации пунктов li.
		// Он использует data('list'), определённую нашей функцией createList:
		
		$('#stage').quicksand(link.data('list').find('li'));
		e.preventDefault();
	});
	
	$('#filter a:first').click();
	
	function createList(text,items){
		
		// Вспомогательная функция, которая получает текст кнопки меню и 
		// массив пунктов li
		
		// Создаем пустой неупорядоченный список
		var ul = $('<ul>',{'class':'hidden'});
		
		$.each(items,function(){
			// Создаем копию каждого пункта li 
			// и добавляем ее в список:
			
			$(this).clone().appendTo(ul);
		});

		ul.appendTo('#container');

		// Создаем пункт меню. Неупорядоченный список добавляется 
		// как параметр data (доступен через .data('list'):
		
		var a = $('<a>',{
			html: text,
			href:'#',
			data: {list:ul}
		}).appendTo('#filter');
	}
});